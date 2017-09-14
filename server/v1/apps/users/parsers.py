from v1.apps.parsers import parse_base, parse_image

def parse_users(users):
    user_set = []
    for user in users:
        user_set.append(parse_user(user))
    return(user_set)

def parse_user(user):
    try:
        result = parse_base(user)
        result.update({
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "admin": user.admin,
        })
        return result
    except AttributeError:
        return None
