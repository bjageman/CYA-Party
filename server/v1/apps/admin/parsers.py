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
            "type_name":action_type.name,
            "type_slug":action_type.slug,
            "type_target":action_type.target,
            "type_id": action_type.id,
            }
    except AttributeError:
        return {}
