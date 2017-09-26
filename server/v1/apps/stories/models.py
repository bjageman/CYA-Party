from v1.apps import db
from v1.apps.models import *

class Story(Base, TimestampMixin):
    owner_id = db.Column(db.ForeignKey('user.id'), index=True)
    owner = db.relationship('User', backref='stories')
    description = db.Column(db.Text)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'))
    image = db.relationship("Image")

class Page(Base, TimestampMixin):
    start = db.Column(db.Boolean,default=False)
    story = db.relationship('Story', backref='pages')
    story_id = db.Column(db.ForeignKey('story.id'), index=True)
    description = db.Column(db.Text)

action_choice_table = db.Table('action_choice', Base.metadata,
    db.Column('action_id', db.Integer, db.ForeignKey('action.id')),
    db.Column('choice_id', db.Integer, db.ForeignKey('choice.id'))
)

class Choice(Base, TimestampMixin):
    page = db.relationship('Page', backref='choices')
    page_id = db.Column(db.ForeignKey('page.id'), index=True)
    content = db.Column(db.Text)
    actions = db.relationship("Action", secondary=action_choice_table)
    required_item = db.Column(db.Integer)

class Action(Base, TimestampMixin):
    description = db.Column(db.Text)
    target = db.Column(db.String(32))
    page = db.relationship('Page', backref='actions')
    page_id = db.Column(db.ForeignKey('page.id'))
    item = db.relationship('Item', backref='actions')
    item_id = db.Column(db.ForeignKey('item.id'))
    type = db.relationship('ActionType', backref='actions')
    type_id = db.Column(db.ForeignKey('action_type.id'), index=True)

class Session(Base, TimestampMixin):
    story = db.relationship('Story', backref='sessions')
    story_id = db.Column(db.ForeignKey('story.id'))
    closed = db.Column(db.Boolean, default=False)
    active = db.Column(db.Boolean, default=False)

player_item_table = db.Table('player_item', Base.metadata,
    db.Column('player_id', db.Integer, db.ForeignKey('player.id')),
    db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
)

class Player(Base, TimestampMixin):
    user = db.relationship('User', backref='players')
    user_id = db.Column(db.ForeignKey('user.id'))
    session = db.relationship('Session', backref='players')
    session_id = db.Column(db.ForeignKey('session.id'))
    inventory = db.relationship("Item", secondary=player_item_table)

class Item(Base, TimestampMixin):
    story = db.relationship('Story', backref='items')
    story_id = db.Column(db.ForeignKey('story.id'))


# Story -> Page -> Choice -> Action -> Resolution -> Next Page
# "Jane's Adventure" -> "Do you go left or right?" -> "Go Right"
# -> [ ACTION -> { TYPE: GET_ITEM, TARGET: 22 } ] -> [ ACTION -> { TYPE: MOVE_PAGE, TARGET: 45 } ] -> "What do you do next?"
