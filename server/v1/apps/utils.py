
import os, json, sys

from flask import make_response, jsonify, abort
from datetime import datetime
from werkzeug.utils import secure_filename

from v1.apps.config import DATETIMEFORMAT, GCS_BUCKET, ALLOWED_EXTENSIONS

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
gcloud_config = os.path.join(__location__, 'gcs_config.json')

def get_model(object, id):
    try:
        id = int(id)
        return object.query.filter(object.id == id).first()
    except (ValueError, TypeError):
        return object.query.filter(object.slug == id).first()

def check_for_invalid_data(data, value):
    try:
        result = data[value]
        abort(400)
    except (AttributeError, KeyError, TypeError):
        return True

def get_optional_data(data, value, return_none=None):
    try:
        return data[value]
    except (AttributeError, KeyError, TypeError):
        return return_none

def get_required_data(data, value):
    try:
        return data[value]
    except (AttributeError, KeyError, TypeError):
        abort(400)

def convert_string_to_datetime(date_string):
    if date_string is not None:
        return datetime.strptime(date_string, DATETIMEFORMAT)
    else:
        return None

#Search Functions

def search_by_name(object, object_type, name):
    if name is not None:
        return object.filter(object_type.name.contains(name))
    return object

#File Upload

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

try:
    from gcloud import storage
    from oauth2client.service_account import ServiceAccountCredentials

    def google_cloud_setup_storage_client(config_file):
        json_data = open(config_file);
        settings = json.load(json_data)
        client = storage.Client(credentials=ServiceAccountCredentials.from_json_keyfile_dict(settings), project=settings['project_id'])
        return client

    def upload_google_cloud_storage(file, location=""):
        filename = secure_filename(file.filename)
        client = google_cloud_setup_storage_client(gcloud_config)
        bucket = client.get_bucket(GCS_BUCKET)
        blob = bucket.blob(location + filename)
        blob.upload_from_file(file, size=1)
        return {
            "url": "https://storage.cloud.google.com/" + GCS_BUCKET + "/" + location + filename,
            "blob_name": blob.name
            }

    def delete_google_cloud_storage(blob_name):
        try:
            client = google_cloud_setup_storage_client(gcloud_config)
            bucket = client.get_bucket(GCS_BUCKET)
            blob = bucket.get_blob(blob_name)
            delete_blob = blob.delete()
            return True
        except AttributeError:
            return False
except ImportError:
    pass
