# 📚 PersonalBook
Adalah sebuah aplikasi manajemen buku pribadi yang dibangun menggunakan react.js dan tailwind.css. Pada aplikasi ini memungkinkan user untuk mencatat, mengelola, dan mencari koleksi buku serta terdapat statistik dimana user dapat meilihat jumlah dimiliki, totalbuku, buku dibaca, dan jumlah buku yang akan dibeli. 

---
## <img width="32" height="32" alt="image" src="https://github.com/user-attachments/assets/3d323333-72e0-42e2-b309-452810d91042" /> Fitur Utama
- **Tambah buku baru**
- **Edit Informasi Buku**
- **Hapus Buku**
- **Filter Buku Berdasarkan Status**
- **Statistic**
- **Lokal Storage**

## <img width="30" height="30" alt="image" src="https://github.com/user-attachments/assets/6526c59b-afe2-44ef-9673-a781b5e8a134" /> Framework
- React.JS  <img width="15" height="15" alt="image" src="https://github.com/user-attachments/assets/1f201fa8-e711-43c5-a117-e7d35c6d0445" />
- Tailwind.CSS  <img width="15" height="15" alt="image" src="https://github.com/user-attachments/assets/d9f6d38d-cde3-452d-bebd-16f97ebf527e" />

## <img width="30" height="30" alt="image" src="https://github.com/user-attachments/assets/0ca085fa-6e27-4217-a2d0-cd6c8c06b351" /> Instalasi
### Prasyarat
Pastikan anda sudah menginstal Node.js. jika belum anda bisa mengunduh Node.js di [Node.js](https://nodejs.org/). Atau anda bisa mengecek melalui terminal (Command Prompt, PowerShell, atau Terminal di Mac/Linux) dan ketik:
```bash
node -v
```
Lalu cek juga npm:
```bash
npm -v
```
Jika Anda melihat nomor versi (misal: ``v20.11.0`` dan ``10.2.4``), berarti Anda sudah memilikinya!
### Langkah-langkah instalasi
1. Clone Repository
   ```bash
   git clone https://github.com/hidroo04/pemrograman_web_itera_123140197.git
   cd pemrograman_web_itera_123140197/Minggu3
   ```
2. Install dependecies
   ```bash
   npm install
   ```
4. Jalankan
   ```bash
   npm run dev
   ```
## <img width="30" height="30" alt="image" src="https://github.com/user-attachments/assets/03673b67-472a-4949-8b29-0e6f50269310" /> Interface aplikasi
1. Homepage
   <img width="1027" height="575" alt="image" src="https://github.com/user-attachments/assets/f9441146-f9b6-488e-9f4e-c3f2bcd41200" />

2. Statistic
   <img width="1270" height="683" alt="image" src="https://github.com/user-attachments/assets/d9c1fba2-2b82-4534-b584-71596e0d391f" />

## Fitur React
1. Hooks  
   Hook adalah fungsi khusus yang diawali dengan use yang memungkinkan "mengaitkan" fitur React (seperti state) ke dalam komponen fungsional.
   - ``src/hooks/useBookStats.js `` Hook ini memisahkan logika kalkulasi statistik dari komponen tampilan Stats.jsx. Ini membuat kode Stats.jsx sangat bersih dan rapi—tugasnya hanya menampilkan data yang ia dapatkan dari hook.
   - ``src/hooks/useLocalStorage.js`` Hook ini menyembunyikan semua logika rumit untuk membaca dan menulis ke localStorage browser. Componen ``BookContext`` hanya perlu memanggil ``useLocalStorage('books', [])`` dan ia langsung mendapatkan state yang     tersinkronisasi. BookContext tidak perlu tahu bagaimana cara kerjanya.
2. Context API  
   Context API adalah cara untuk mengirimkan data (seperti state atau fungsi) ke komponen-komponen yang ada di "bawah" (turunan) tanpa harus meneruskannya secara manual melalui props di setiap level.

3. React Router  
   React Router adalah pustaka (library) pihak ketiga yang menangani navigasi atau perpindahan halaman.
   - ``src/main.jsx``: Membungkus seluruh aplikasi dengan ``<BrowserRouter>``.
   - ``src/App.jsx``: Menggunakan ``<Routes>`` dan ``<Route>`` untuk mendefinisikan "peta". "Jika URL adalah ``/``, tampilkan komponen ``Home``. Jika URL adalah ``/stats``, tampilkan komponen ``Stats``."
   - ``src/components/Header.jsx``: Menggunakan ``<NavLink>`` (bukan tag ``<a>`` biasa) untuk membuat link navigasi. Saat diklik, link ini mengubah URL tanpa merefresh seluruh halaman.

## <img width="30" height="30" alt="image" src="https://github.com/user-attachments/assets/f3e2d300-788a-4a12-bc9f-2f24a5d55933" /> Testing
<img width="959" height="1041" alt="Screenshot 2025-11-15 200823" src="https://github.com/user-attachments/assets/65492044-7304-4529-83a4-808c55f320cb" />