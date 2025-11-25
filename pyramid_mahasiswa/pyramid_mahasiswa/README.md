# Pyramid Matakuliah — Testing (PostgreSQL + Postman)

Panduan singkat untuk menjalankan aplikasi, menghubungkan ke PostgreSQL, menjalankan migrasi, menambahkan data awal, dan mengetes API menggunakan Postman.

**Prasyarat**:
- Python 3.8+ terinstall
- PostgreSQL terinstall dan berjalan
- Git (opsional)

**Langkah singkat**

1. Buat virtual environment dan aktifkan (PowerShell):

```
python -m venv .venv
.\.venv\Scripts\Activate
```

2. Install package dan dependensi:

```
pip install -e .
pip install psycopg2-binary
```

3. Buat database PostgreSQL dan user (contoh):

```
-- di psql atau pgAdmin
CREATE DATABASE pyramid_db;
CREATE USER pyramid_user WITH PASSWORD 'secret';
GRANT ALL PRIVILEGES ON DATABASE pyramid_db TO pyramid_user;
```

4. Konfigurasi koneksi database di `development.ini`.

Buka file `development.ini` (di root project) dan temukan baris `sqlalchemy.url = ...` lalu ubah menjadi seperti di bawah:

```
sqlalchemy.url = postgresql+psycopg2://pyramid_user:secret@localhost:5432/pyramid_db
```

Pastikan nama host, port (default 5432), dan credentials sesuai dengan instalasi PostgreSQL Anda.

5. Jalankan migrasi Alembic (apply migrations):

```
alembic -c development.ini upgrade head
```

6. Tambahkan data awal (script inisialisasi tersedia):

```
initialize_pyramid_mahasiswa_db development.ini
```

Atau jalankan modul langsung:

```
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

Script tersebut akan menambahkan 2 matakuliah contoh (IF101, IF102).

Untuk menambahkan data tambahan, gunakan script:

```
python add_matakuliah.py
```

7. Jalankan server:

```
pserve development.ini
```

Secara default Pyramid menggunakan port `6543`. Akses base URL:

```
http://localhost:6543
```

**API Endpoints Matakuliah**:
- `GET /api/matakuliah` — daftar semua matakuliah
- `GET /api/matakuliah/{id}` — detail satu matakuliah
- `POST /api/matakuliah` — tambah matakuliah baru
- `PUT /api/matakuliah/{id}` — update matakuliah
- `DELETE /api/matakuliah/{id}` — hapus matakuliah

**Contoh body JSON untuk `POST /api/matakuliah`:**

```json
{
  "kode_mk": "IF103",
  "nama_mk": "Struktur Data",
  "sks": 3,
  "semester": 3
}
```

**Contoh body JSON untuk `PUT /api/matakuliah/1` (partial update diperbolehkan):**

```json
{
  "nama_mk": "Pemrograman Web - Advanced",
  "sks": 4
}
```

8. Testing dengan Postman

- Import file `postman_collection.json` (terlampir di repo) ke Postman.
- Atur `BASE_URL` di collection atau gunakan `http://localhost:6543`.
- Contoh request:
  - GET `{{BASE_URL}}/api/matakuliah`
  - GET `{{BASE_URL}}/api/matakuliah/1`
  - POST `{{BASE_URL}}/api/matakuliah` (body -> raw -> JSON)
  - PUT `{{BASE_URL}}/api/matakuliah/1` (body -> JSON)
  - DELETE `{{BASE_URL}}/api/matakuliah/1`

9. Verifikasi

- Pastikan response status code dan payload sesuai (JSON).
- Contoh response POST: `{'success': True, 'matakuliah': {...}}`
- Contoh response GET all: `{'matakuliahs': [...]}`

**Troubleshooting**:

Jika menemukan error koneksi database:
- Periksa `development.ini` dan pastikan `sqlalchemy.url` benar
- Jalankan `psql` atau pgAdmin untuk memastikan database berjalan
- Verifikasi kredensial PostgreSQL (`pyramid_user` / password)

**Data Sample Matakuliah** (sudah ada di database):
- IF101 - Pemrograman Web (3 SKS, Semester 5)
- IF102 - Basis Data (4 SKS, Semester 5)
- IF104 - Algoritma dan Pemrograman (4 SKS, Semester 1)
- IF105 - Jaringan Komputer (3 SKS, Semester 5) 
