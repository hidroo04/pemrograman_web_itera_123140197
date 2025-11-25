# Pyramid Mahasiswa — Testing (PostgreSQL + Postman)

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
sqlalchemy.url = postgresql+psycopg2://pyramid_user:secret@localhost/pyramid_db
```

Jika `development.ini` tidak memiliki `sqlalchemy.url`, tambahkan di bagian `[app:main]` atau gunakan variabel lingkungan dan sedot nilai dari sana. Pastikan nama host dan port sesuai instalasi PostgreSQL Anda.

5. Jalankan migrasi Alembic (apply migrations):

```
# jika Anda sudah membuat revisi migrasi, cukup upgrade head
alembic -c development.ini upgrade head

# jika belum ada revisi (hanya jika Anda membuat perubahan model), buat revisi otomatis
alembic -c development.ini revision --autogenerate -m "create mahasiswa table"
alembic -c development.ini upgrade head
```

6. Tambahkan data awal (script inisialisasi tersedia):

Jika Anda sudah meng-install package dengan `pip install -e .`, ada console script bernama `initialize_pyramid_mahasiswa_db`:

```
initialize_pyramid_mahasiswa_db development.ini
```

Atau jalankan modul langsung (tanpa menginstall):

```
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

Script tersebut akan menambahkan 2 mahasiswa contoh (nim `12345` dan `54321`).

7. Jalankan server:

```
pserve development.ini
```

Secara default Pyramid menggunakan port `6543`. Akses base URL:

```
http://localhost:6543
```

API endpoints (tersedia di project):
- `GET /api/mahasiswa` — daftar semua mahasiswa
- `GET /api/mahasiswa/{id}` — detail satu mahasiswa
- `POST /api/mahasiswa` — tambah mahasiswa baru
- `PUT /api/mahasiswa/{id}` — update mahasiswa
- `DELETE /api/mahasiswa/{id}` — hapus mahasiswa

Contoh body JSON untuk `POST /api/mahasiswa`:

```
{
  "nim": "11111",
  "nama": "Andi",
  "jurusan": "Teknik Informatika",
  "tanggal_lahir": "2000-01-20",
  "alamat": "Jl. Contoh No.1"
}
```

Contoh body JSON untuk `PUT /api/mahasiswa/1` (partial update diperbolehkan):

```
{
  "nama": "Andi Wijaya",
  "alamat": "Alamat baru"
}
```

8. Testing dengan Postman

- Import file `postman_collection.json` (terlampir di repo) ke Postman.
- Atur `BASE_URL` di collection atau gunakan `http://localhost:6543`.
- Contoh request:
  - GET `{{BASE_URL}}/api/mahasiswa`
  - GET `{{BASE_URL}}/api/mahasiswa/1`
  - POST `{{BASE_URL}}/api/mahasiswa` (body -> raw -> JSON)
  - PUT `{{BASE_URL}}/api/mahasiswa/1` (body -> JSON)
  - DELETE `{{BASE_URL}}/api/mahasiswa/1`

9. Verifikasi

- Pastikan response status code dan payload sesuai (JSON), mis. POST mengembalikan `{'success': True, 'mahasiswa': {...}}`.

Jika menemukan error koneksi database, periksa `development.ini` dan jalankan `psql`/pgAdmin untuk memastikan database berjalan dan kredensial benar.

Jika mau, saya juga dapat membuat contoh Postman collection lebih lengkap (environment + sample responses). Mau saya tambahkan file koleksi sekarang? 
