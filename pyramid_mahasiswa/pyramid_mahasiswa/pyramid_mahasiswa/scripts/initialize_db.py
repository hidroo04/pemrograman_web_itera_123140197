import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models

def setup_models(dbsession):
    """
    Add initial model objects.
    """

    existing_mk1 = dbsession.query(models.Matakuliah).filter_by(kode_mk='IF101').first()
    existing_mk2 = dbsession.query(models.Matakuliah).filter_by(kode_mk='IF102').first()
    
    if not existing_mk1:
        mk1 = models.Matakuliah(
            kode_mk='IF101',
            nama_mk='Pemrograman Web',
            sks=3,
            semester=5
        )
        dbsession.add(mk1)
        print("Matakuliah IF101 added.")
    else:
        print("Matakuliah IF101 already exists.")
    
    if not existing_mk2:
        mk2 = models.Matakuliah(
            kode_mk='IF102',
            nama_mk='Basis Data',
            sks=4,
            semester=5
        )
        dbsession.add(mk2)
        print("Matakuliah IF102 added.")
    else:
        print("Matakuliah IF102 already exists.")

def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)

    # bootstrap will return a context with request + closer
    env = bootstrap(args.config_uri)
    request = env['request']

    try:
        # gunakan request.tm (bukan tm_manager)
        with request.tm:
            dbsession = request.dbsession
            setup_models(dbsession)

        print("Database initialized successfully.")

    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.

Your database should be up and running before you
initialize your project. Make sure your database server
is running and your connection string in development.ini
is correctly configured.
''')

    finally:
        env['closer']()


if __name__ == '__main__':
    main()