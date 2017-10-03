from v1.apps import db
from v1.apps.models import *

class Command(Base, TimestampMixin):
    name = db.Column(db.String(80), unique=True)
    target = db.Column(db.String(80))

# Story -> Page -> Choice -> Action -> Resolution -> Next Page
# "Jane's Adventure" -> "Do you go left or right?" -> "Go Right"
# -> [ ACTION -> { TYPE: GET_ITEM, TARGET: 22 } ] -> [ ACTION -> { TYPE: MOVE_PAGE, TARGET: 45 } ] -> "What do you do next?"
