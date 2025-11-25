#!/usr/bin/env python
"""Script untuk menambahkan data matakuliah baru."""
from datetime import date
from pyramid.paster import bootstrap
from pyramid_mahasiswa.models import Matakuliah

def add_matakuliah(config_uri):
    env = bootstrap(config_uri)
    request = env['request']
    
    try:
        with request.tm:
            dbsession = request.dbsession
            
            # Check and add first matakuliah
            existing1 = dbsession.query(Matakuliah).filter_by(kode_mk='IF104').first()
            if not existing1:
                mk1 = Matakuliah(
                    kode_mk='IF104',
                    nama_mk='Algoritma dan Pemrograman',
                    sks=4,
                    semester=1
                )
                dbsession.add(mk1)
                print(f"✓ Matakuliah IF104 berhasil ditambahkan!")
                print(f"  Nama: {mk1.nama_mk}, SKS: {mk1.sks}, Semester: {mk1.semester}")
            else:
                print(f"✗ Matakuliah IF104 sudah ada!")
            
            # Check and add second matakuliah
            existing2 = dbsession.query(Matakuliah).filter_by(kode_mk='IF105').first()
            if not existing2:
                mk2 = Matakuliah(
                    kode_mk='IF105',
                    nama_mk='Jaringan Komputer',
                    sks=3,
                    semester=5
                )
                dbsession.add(mk2)
                print(f"✓ Matakuliah IF105 berhasil ditambahkan!")
                print(f"  Nama: {mk2.nama_mk}, SKS: {mk2.sks}, Semester: {mk2.semester}")
            else:
                print(f"✗ Matakuliah IF105 sudah ada!")
    
    except Exception as e:
        print(f"✗ Error: {str(e)}")
    
    finally:
        env['closer']()

if __name__ == '__main__':
    config_uri = 'development.ini'
    add_matakuliah(config_uri)
