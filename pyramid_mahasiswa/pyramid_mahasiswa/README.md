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

8. Testing dengan Postman
