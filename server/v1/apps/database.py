from passlib.apps import custom_app_context as pwd_context
from .users.models import User

def authenticate(name, password):
    user = User.query.filter_by(name = name).first()
    if user and user.verify_password(password):
        return user
