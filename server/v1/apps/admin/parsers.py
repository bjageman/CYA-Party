from v1.apps.parsers import parse_base, parse_image

##
#  Admin Parsers
##

def parse_action_types(action_types):
    action_type_set = []
    for action_type in action_types:
        action_type_set.append(parse_action_type(action_type))
    return(action_type_set)

def parse_action_type(action_type):
    try:
        return {
            "name":action_type.slug,
            "id": action_type.id,
            }
    except AttributeError:
        return None
