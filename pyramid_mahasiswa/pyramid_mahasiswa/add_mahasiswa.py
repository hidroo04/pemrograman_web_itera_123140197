#!/usr/bin/env python
"""Script untuk menambahkan data mahasiswa baru."""
import sys
from datetime import date
from pyramid.paster import bootstrap
from pyramid_mahasiswa.models import Mahasiswa

def add_mahasiswa(config_uri):
    env = bootstrap(config_uri)
    request = env['request']
    
    try:
        with request.tm:
            dbsession = request.dbsession
            
            # Check if mahasiswa already exists
            existing = dbsession.query(Mahasiswa).filter_by(nim='77777').first()
            if existing:
                print(f"Mahasiswa dengan NIM 77777 sudah ada!")
                return
            
            # Create new mahasiswa
            mahasiswa = Mahasiswa(
                nim='77777',
                nama='Dina Kusuma',
                jurusan='Teknik Informatika',
                tanggal_lahir=date(2002, 6, 10),
                alamat='Jl. Sudirman No.50, Surabaya'
            )
            dbsession.add(mahasiswa)
            dbsession.flush()
            
            print(f"✓ Mahasiswa berhasil ditambahkan!")
            print(f"  ID: {mahasiswa.id}")
            print(f"  NIM: {mahasiswa.nim}")
            print(f"  Nama: {mahasiswa.nama}")
            print(f"  Jurusan: {mahasiswa.jurusan}")
            print(f"  Tanggal Lahir: {mahasiswa.tanggal_lahir}")
            print(f"  Alamat: {mahasiswa.alamat}")
    
    except Exception as e:
        print(f"✗ Error: {str(e)}")
    
    finally:
        env['closer']()

if __name__ == '__main__':
    config_uri = 'development.ini'
    add_mahasiswa(config_uri)
