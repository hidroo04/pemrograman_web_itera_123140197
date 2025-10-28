// Mendeklarasikan variabel dengan var, let, dan const
var nama = "Budi";
let usia = 20;
const TAHUN_LAHIR = 2004;

// Menampilkan output ke konsol
console.log("Nama: " + nama);
console.log("Usia: " + usia);
console.log("Tahun Lahir: " + TAHUN_LAHIR);

// Menampilkan output ke halaman HTML
document.getElementById("result").innerHTML = `
<p>Nama: <strong>${nama}</strong></p>
<p>Usia: <strong>${usia}</strong></p>
<p>Tahun Lahir: <strong>${TAHUN_LAHIR}</strong></p>
`;

// Struktur kondisional
let nilai = 85;
let grade = "";

// If-else if-else
if (nilai >= 90) {
  grade = "A";
} else if (nilai >= 80) {
  grade = "B";
} else if (nilai >= 70) {
  grade = "C";
} else if (nilai >= 60) {
  grade = "D";
} else {
  grade = "E";
}

console.log("Nilai: " + nilai + ", Grade: " + grade);

document.getElementById("result").innerHTML += `
  <hr>
  <p>Nilai: <strong>${nilai}</strong></p>
  <p>Grade: <strong>${grade}</strong></p>
`;

// Ternary operator
let status = nilai >= 60 ? "Lulus" : "Tidak Lulus";
console.log("Status: " + status);

document.getElementById("result").innerHTML += `
  <p>Status: <strong>${status}</strong></p>
`;

// Switch case
let hari = new Date().getDay();
let namaHari = "";

switch (hari) {
  case 0:
    namaHari = "Minggu";
    break;
  case 1:
    namaHari = "Senin";
    break;
  case 2:
    namaHari = "Selasa";
    break;
  case 3:
    namaHari = "Rabu";
    break;
  case 4:
    namaHari = "Kamis";
    break;
  case 5:
    namaHari = "Jumat";
    break;
  case 6:
    namaHari = "Sabtu";
    break;
  default:
    namaHari = "Hari tidak valid";
}

console.log("Hari ini adalah: " + namaHari);

document.getElementById("result").innerHTML += `
  <p>Hari ini adalah: <strong>${namaHari}</strong></p>
`;

// For loop
let nilaiSiswa = [85, 92, 78, 90, 88];
let total = 0;

document.getElementById("result").innerHTML += `
  <hr>
  <h3>Daftar Nilai Siswa:</h3>
  <ul id="daftar-nilai"></ul>
  <p id="rata-rata"></p>
`;

for (let i = 0; i < nilaiSiswa.length; i++) {
  total += nilaiSiswa[i];
  document.getElementById("daftar-nilai").innerHTML += `
    <li>Siswa ${i + 1}: ${nilaiSiswa[i]}</li>
  `;
}

let rataRata = total / nilaiSiswa.length;
document.getElementById("rata-rata").innerHTML = `
  Rata-rata nilai: <strong>${rataRata.toFixed(2)}</strong>
`;

// While loop
document.getElementById("result").innerHTML += `
  <h3>Countdown:</h3>
  <div id="countdown"></div>
`;

let hitungMundur = 5;
while (hitungMundur > 0) {
  document.getElementById("countdown").innerHTML += `
    <span class="inline-block bg-blue-100 px-2 py-1 m-1 rounded">${hitungMundur}</span>
  `;
  hitungMundur--;
}

// For...of loop (ES6)
document.getElementById("result").innerHTML += `
  <h3>Nilai dengan for...of:</h3>
  <div id="nilai-of" class="flex flex-wrap gap-2"></div>
`;

for (let nilai of nilaiSiswa) {
  let statusNilai = nilai >= 80 ? "text-green-600" : "text-red-600";
  document.getElementById("nilai-of").innerHTML += `
    <span class="inline-block bg-gray-100 px-3 py-1 rounded ${statusNilai}">${nilai}</span>
  `;
}

