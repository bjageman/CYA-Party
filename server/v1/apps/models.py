from datetime import datetime
from slugify import slugify

from sqlalchemy.ext.declarative import declared_attr

from v1.apps.config import DATETIMEFORMAT
from v1.apps import db

class TimestampMixin(object):
    created = db.Column(db.DateTime, default=datetime.utcnow)
    updated = db.Column(db.DateTime, default=datetime.utcnow)

    @declared_attr
    def __mapper_args__(cls):
        return {'order_by': 'created desc'}

    def readable_date(self, date, format=DATETIMEFORMAT):
        """Format the given date using the given format."""
        return date.strftime(format)

class Base(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    slug = db.Column(db.String(80), unique=True)

    def __unicode__(self):
        return self.name

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    def set_name(self, name):
        slug = slugify(name)
        counter = 2
        while self.query.filter_by(slug=slug).first() is not None:
            slug = slugify(name) + "-" + str(counter)
            counter = counter + 1
        self.name = name
        self.slug = slug

    def __init__(self, *args, **kwargs):
        if not 'slug' in kwargs:
            self.set_name(kwargs.get('name', ''))
        super().__init__(*args, **kwargs)

class Image(Base, TimestampMixin):
    url = db.Column(db.String(256))
    blob = db.Column(db.String(256))
