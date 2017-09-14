from .models import User

def authenticate(name, password):
    user = User.query.filter_by(name = name).first()
    if user and user.verify_password(password):
        return user

def identity(payload):
    return User.query.get(payload['identity'])
