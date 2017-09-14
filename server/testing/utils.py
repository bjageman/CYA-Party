import json

def bytes_to_json(data):
    return json.loads(data.decode('utf8'))
