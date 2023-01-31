def deploy():
    """Run deployment tasks."""
    from app import create_app
    from app import db
    from flask_migrate import upgrade,migrate,init,stamp
    from models import Multiples

    app = create_app()
    app.app_context().push()
    #
    # create database and tables
    db.create_all()
    # migrate database to latest revision
    stamp()
    migrate()
    upgrade()

deploy()
