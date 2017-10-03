from .models import Command
from v1.apps.utils import get_required_data, get_optional_data, get_model

#Action Command
def get_command(command_id):
    command = get_model(Command, command_id)
    if command is None:
        abort(404)
    return command
