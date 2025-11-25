from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from zope.sqlalchemy import register


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    
    # Setup database
    engine = engine_from_config(settings, 'sqlalchemy.')
    session_factory = sessionmaker()
    session_factory.configure(bind=engine)
    register(session_factory)
    config.registry['dbsession_factory'] = session_factory
    
    # Add a request method to get dbsession
    def get_dbsession(request):
        session = session_factory()
        def cleanup(request):
            session.close()
        request.add_finished_callback(cleanup)
        return session
    
    config.add_request_method(get_dbsession, 'dbsession', reify=True)
    
    config.include('.routes')
    config.include('pyramid_jinja2')
    config.include('pyramid_tm')
    config.scan('.views')

    return config.make_wsgi_app()