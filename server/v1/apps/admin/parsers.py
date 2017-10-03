from v1.apps.parsers import parse_base, parse_image

##
#  Admin Parsers
##

def parse_commands(commands):
    command_set = []
    for command in commands:
        command_set.append(parse_command(command))
    return(command_set)

def parse_command(command):
    try:
        return {
            "name":command.name,
            "slug":command.slug,
            "target":command.target,
            "id": command.id,
            }
    except AttributeError:
        return None
