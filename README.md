# Choose Our Own Adventure

Play a choose-your-own-adventure game, either by yourself or with your friends! Comes with an editor as well.

## Setting up a dev environment

### Front-end

You'll need to have npm and yarn installed. Clone the repository and in the root folder type:

```
cp src/config.example.js src/config.js
yarn
yarn start
```

Your browser should open and display the home page.

#### configuration

There is a configuration file in src/config.js (if you didn't do it above, use the config.example.js template).

| Variable | Description |
| ------------- |:-------------|
| API_URL|The url of the backend server|
| API_VERSION|The version of the backed server (keep at 1)|
|VERSION (optional)|Display on the page which version you're using|
| DEBUG |Display DEBUG info (do NOT use for actual games!) |

### Back-end

We're using a python3 flask server to handle the database and API calls. Run the following from root to get it running:

```
cd server
pyvevn env
source ./env/bin/activate
pip install -r ../requirements.txt
```

After that, you'll need to add your environment variables. You can create a .env file in the server folder and it won't be added to git. See configuration below for what you need.

After you add the required environment variables, simply run `python3 run.py` and the server should start.

#### configuration

You'll need to set up a database in order to get the server running properly. Currently mysql, postgresql, and sqlite are supported. One you have a DB server installed, you'll need to create the database beforehand.

| Variable | Default |Description |
| ------------- |:---|:-------------|
|DB_USER|root|database username|
|DB_PASS|password|database password|
|DB_HOST|localhost|database hostname|
|DB_DATABASE|database|name of the database|
|DB_TEST|test|name of the test database|
|DB_TYPE|mysql|the type of DB(mysql, postgres, sqlite)|
|DB_PORT|3306|The database port|
