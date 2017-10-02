from .models import ActionType
from v1.apps.utils import get_required_data, get_optional_data, get_model

#Action Types
def get_action_type(action_type_id):
    action_type = get_model(ActionType, action_type_id)
    if action_type is None:
        abort(404)
    return action_type
