from flask import Blueprint

stories = Blueprint('stories', __name__)

from .views import edit
from .views import play
