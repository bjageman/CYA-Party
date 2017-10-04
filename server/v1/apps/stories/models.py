from v1.apps import db
from v1.apps.models import *

##
#  Static Model Data
##

class Story(Base, TimestampMixin):
    owner_id = db.Column(db.ForeignKey('user.id'), index=True)
    owner = db.relationship('User', backref='stories')
    description = db.Column(db.Text)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'))
    image = db.relationship("Image")
    pages = db.relationship('Page', cascade="all,delete", backref='story')
    public = db.Column(db.Boolean, default=True)

class Page(Base, TimestampMixin):
    start = db.Column(db.Boolean,default=False)
    story_id = db.Column(db.ForeignKey('story.id'), index=True)
    description = db.Column(db.Text)
    choices = db.relationship('Choice', cascade="all,delete", backref='page')

class Choice(Base, TimestampMixin):
    page_id = db.Column(db.ForeignKey('page.id'), index=True)
    content = db.Column(db.Text)
    required_item = db.Column(db.Integer)
    actions = db.relationship("Action", cascade="all,delete", backref="choice")

class Action(Base, TimestampMixin):
    description = db.Column(db.Text)
    choice_id = db.Column(db.Integer, db.ForeignKey('choice.id'))
    target = db.Column(db.String(32))
    # Target is a page
    page = db.relationship('Page', backref='actions')
    page_id = db.Column(db.ForeignKey('page.id'))
    # Target is an item
    item = db.relationship('Item', backref='actions')
    item_id = db.Column(db.ForeignKey('item.id'))
    command = db.relationship('Command', backref='actions')
    command_id = db.Column(db.ForeignKey('command.id'), index=True)

class Item(Base, TimestampMixin):
    story = db.relationship('Story', backref='items')
    story_id = db.Column(db.ForeignKey('story.id'))

##
#  Game Session Data (not static)
##

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

class Vote(Base, TimestampMixin):
    session = db.relationship('Session', backref='votes')
    session_id = db.Column(db.ForeignKey('session.id'))
    page = db.relationship('Page', backref='votes')
    page_id = db.Column(db.ForeignKey('page.id'))
    player = db.relationship('Player', backref='votes')
    player_id = db.Column(db.ForeignKey('player.id'))
    choice = db.relationship('Choice', backref='votes')
    choice_id = db.Column(db.ForeignKey('choice.id'))


# Story -> Page -> Choice -> Action -> Resolution -> Next Page
# "Jane's Adventure" -> "Do you go left or right?" -> "Go Right"
# -> [ ACTION -> { TYPE: GET_ITEM, TARGET: 22 } ] -> [ ACTION -> { TYPE: MOVE_PAGE, TARGET: 45 } ] -> "What do you do next?"
