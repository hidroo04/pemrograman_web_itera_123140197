mahasiswa = {
    "rafiq": {
        "nim": "123140197",
        "uts": 85,
        "uas": 90,
        "tugas": 80
    },
    "gilang": {
        "nim": "123140187",
        "uts": 75,
        "uas": 80,
        "tugas": 70
    },
    "ripaldy": {
        "nim": "123140179",
        "uts": 65,
        "uas": 70,
        "tugas": 60
    },
    "maxavier": {
        "nim": "123140199",
        "uts": 95,
        "uas": 100,
        "tugas": 90
    },
    "farhan": {
        "nim": "123140075",
        "uts": 55,
        "uas": 60,
        "tugas": 50
    }
}

def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir: 30% UTS + 40% UAS + 30% Tugas"""
    return (uts * 0.3) + (uas * 0.4) + (tugas * 0.3)

def tentukan_grade(nilai_akhir):
    """Menentukan grade berdasarkan nilai akhir"""
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def tampilkan_tabel(daftar_mahasiswa):
    """Menampilkan data mahasiswa dalam format tabel"""
    print("\n" + "="*95)
    print(f"{'Nama':<15} {'NIM':<15} {'UTS':<8} {'UAS':<8} {'Tugas':<8} {'Nilai Akhir':<12} {'Grade':<8}")
    print("="*95)
    
    for nama, info in daftar_mahasiswa.items():
        nilai_akhir = hitung_nilai_akhir(info['uts'], info['uas'], info['tugas'])
        grade = tentukan_grade(nilai_akhir)
        print(f"{nama.title():<15} {info['nim']:<15} {info['uts']:<8} {info['uas']:<8} {info['tugas']:<8} {nilai_akhir:<12.2f} {grade:<8}")
    
    print("="*95 + "\n")

def cari_mahasiswa_ekstrem(daftar_mahasiswa, mode='tertinggi'):
    """Mencari mahasiswa dengan nilai tertinggi atau terendah"""
    if not daftar_mahasiswa:
        print("Tidak ada data mahasiswa.")
        return
    
    nilai_ekstrem = None
    mahasiswa_ekstrem = None
    
    for nama, info in daftar_mahasiswa.items():
        nilai_akhir = hitung_nilai_akhir(info['uts'], info['uas'], info['tugas'])
        
        if nilai_ekstrem is None:
            nilai_ekstrem = nilai_akhir
            mahasiswa_ekstrem = (nama, info, nilai_akhir)
        else:
            if mode == 'tertinggi' and nilai_akhir > nilai_ekstrem:
                nilai_ekstrem = nilai_akhir
                mahasiswa_ekstrem = (nama, info, nilai_akhir)
            elif mode == 'terendah' and nilai_akhir < nilai_ekstrem:
                nilai_ekstrem = nilai_akhir
                mahasiswa_ekstrem = (nama, info, nilai_akhir)
    
    if mahasiswa_ekstrem:
        nama, info, nilai_akhir = mahasiswa_ekstrem
        grade = tentukan_grade(nilai_akhir)
        print(f"\nMahasiswa dengan nilai {mode}:")
        print(f"Nama: {nama.title()}")
        print(f"NIM: {info['nim']}")
        print(f"UTS: {info['uts']}")
        print(f"UAS: {info['uas']}")
        print(f"Tugas: {info['tugas']}")
        print(f"Nilai Akhir: {nilai_akhir:.2f}")
        print(f"Grade: {grade}\n")

def cari_mahasiswa(daftar_mahasiswa):
    print("\nCari mahasiswa berdasarkan:\n1. NIM\n2. Nama")
    pilihan = input("Masukkan pilihan (1/2): ")
    
    if pilihan == '1':
        cari_nim = input("Masukkan NIM mahasiswa: ")
        found = False
        for nama, info in daftar_mahasiswa.items():
            if info['nim'] == cari_nim:
                nilai_akhir = hitung_nilai_akhir(info['uts'], info['uas'], info['tugas'])
                grade = tentukan_grade(nilai_akhir)
                print(f"\nNama: {nama.title()}")
                print(f"NIM: {info['nim']}")
                print(f"UTS: {info['uts']}")
                print(f"UAS: {info['uas']}")
                print(f"Tugas: {info['tugas']}")
                print(f"Nilai Akhir: {nilai_akhir:.2f}")
                print(f"Grade: {grade}\n")
                found = True
                break
        
        if not found:
            print("Mahasiswa dengan NIM tersebut tidak ditemukan.\n")

    elif pilihan == '2':
        cari_nama = input("Masukkan nama mahasiswa: ").lower()
        info_nama = daftar_mahasiswa.get(cari_nama)
        
        if info_nama:
            nilai_akhir = hitung_nilai_akhir(info_nama['uts'], info_nama['uas'], info_nama['tugas'])
            grade = tentukan_grade(nilai_akhir)
            print(f"\nNama: {cari_nama.title()}")
            print(f"NIM: {info_nama['nim']}")
            print(f"UTS: {info_nama['uts']}")
            print(f"UAS: {info_nama['uas']}")
            print(f"Tugas: {info_nama['tugas']}")
            print(f"Nilai Akhir: {nilai_akhir:.2f}")
            print(f"Grade: {grade}\n")
        else:
            print("Mahasiswa dengan nama tersebut tidak ditemukan.\n")
    else:
        print("Pilihan tidak valid.\n")

def tambah_data(daftar_mahasiswa):
    print("\nTambah data mahasiswa baru:")
    nama_mhs = input("Masukkan nama mahasiswa: ").lower()

    if nama_mhs in daftar_mahasiswa:
        print("Mahasiswa dengan nama tersebut sudah ada.\n")
        return
    
    nim_mhs = input("Masukkan NIM mahasiswa: ")
    uts_mhs = int(input("Masukkan nilai UTS: "))
    uas_mhs = int(input("Masukkan nilai UAS: "))
    tugas_mhs = int(input("Masukkan nilai Tugas: "))

    daftar_mahasiswa[nama_mhs] = {
        "nim": nim_mhs,
        "uts": uts_mhs,
        "uas": uas_mhs,
        "tugas": tugas_mhs
    }

    print(f"Data mahasiswa '{nama_mhs.title()}' berhasil ditambahkan.\n")

def main():
    while True:
        print("\n" + "="*40)
        print("SISTEM MANAJEMEN DATA MAHASISWA")
        print("="*40)
        print("1. Cari data mahasiswa")
        print("2. Tambah data mahasiswa")
        print("3. Tampilkan semua data (tabel)")
        print("4. Cari mahasiswa nilai tertinggi")
        print("5. Cari mahasiswa nilai terendah")
        print("6. Keluar")
        print("="*40)

        pilihan = input("Masukkan pilihan (1-6): ")
        
        if pilihan == '1':
            cari_mahasiswa(mahasiswa)
        elif pilihan == '2':
            tambah_data(mahasiswa)
        elif pilihan == '3':
            tampilkan_tabel(mahasiswa)
        elif pilihan == '4':
            cari_mahasiswa_ekstrem(mahasiswa, 'tertinggi')
        elif pilihan == '5':
            cari_mahasiswa_ekstrem(mahasiswa, 'terendah')
        elif pilihan == '6':
            print("\nTerima kasih! Keluar dari program.")
            break
        else:
            print("Pilihan tidak valid. Silakan coba lagi.\n")

if __name__ == "__main__":
    main()