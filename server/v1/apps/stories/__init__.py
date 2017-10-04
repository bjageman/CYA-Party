from flask import Blueprint

editor = Blueprint('editor', __name__)

from .views import edit

player = Blueprint('player', __name__)

from .views import play
