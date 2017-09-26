from v1.apps import db
from passlib.apps import custom_app_context as pwd_context
from v1.apps.models import *

class User(Base, TimestampMixin):
    password_hash = db.Column(db.String(128))
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    email = db.Column(db.String(64))
    gender = db.Column(db.String(32))
    admin = db.Column(db.Boolean,default=False)
    def hash_password(self, password):
        self.password_hash = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)
