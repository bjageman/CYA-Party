import os

DB_USER = (os.environ.get('DB_USER','root'))
DB_PASS = (os.environ.get('DB_PASS','password'))
DB_HOST = (os.environ.get('DB_HOST','localhost'))
DB_DATABASE = (os.environ.get('DB_DATABASE','database'))
DB_TYPE = (os.environ.get('DB_TYPE','mysql'))
DB_PORT = (os.environ.get('DB_PORT','3306'))

DB_TEST = (os.environ.get('DB_TEST','test'))
DATABASE = DB_TYPE + '://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST + ":" + DB_PORT + '/' + DB_DATABASE

DATABASE_TEST = DB_TYPE + '://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST + ":" + DB_PORT + '/' + DB_TEST

DATETIMEFORMAT = "%m/%d/%Y %I:%M %p"
#08/01/2017 12:00 AM

#File Uploads
UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER')
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
#Google Cloud storage
GCS_BUCKET = os.environ.get('GCS_BUCKET')

# email server
MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.googlemail.com')
MAIL_PORT = os.environ.get('MAIL_PORT', 587)
MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', False)
MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL', False)
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')

# administrator list
ADMINS = ['your-gmail-username@gmail.com']
