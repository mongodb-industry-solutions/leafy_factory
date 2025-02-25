# Leafy Factory backend

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache%20Kafka-231F20.svg?style=for-the-badge&logo=Apache-Kafka&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Mosquitto](https://img.shields.io/badge/mosquitto-%233C5280.svg?style=for-the-badge&logo=eclipsemosquitto&logoColor=white)

## Prerequisites.

1. **Python (3.12 or higher):** The project relies on Python to run the backend and manage dependencies. It’s required to have python installed on the target machine. It’s recommended to download Python from the official website: [Python Downloads](https://www.python.org/downloads/). After installing Python, pip will be available by default.

2. **PostgreSQL (15.10 or higher):** PostgreSQL is the SQL database that will be used to simulate the ERP and MES systems. PostgreSQL could be downloaded [from the official website](https://www.postgresql.org/download/). Remember to check that PostgreSQL is running after installing it. For the purpose of this internal README, the demo will use a hosted PostgreSQL cluster.

3. **MongoDB Atlas Cluster (8.0.4 or higher):** MongoDB will be used as a unified namespace for the SQL systems: You can get If you don't have an account, you can sign up for free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register). Follow these steps to set up a minimum free tier cluster:

    1. Log in to your **MongoDB Atlas** account.
    2. Create a new project or use an existing one, and then click “create a new database”.
    3. Choose the free tier option (M0).
    4. You can choose the cloud provider of your choice but we recommend using the same provider and region both for the cluster and the app hosting in order to improve performance.
    5. Configure the cluster settings according to your preferences and then click “finish and close” on the bottom right.
    6. Finally, add your IP to the network access list so you can access your cluster remotely.

4. **Apache Kafka (3.9.0):** Used to transmit SQL data to a Kafka topic via the MySQL connector and consume it with the MongoDB Sink Connector. For the purpose of this internal README, the demo will use a hosted Kafka cluster.

5. **Install Java JDK (Minimum version 23):** Install the Java JDK [from the official website](https://www.oracle.com/java/technologies/downloads/) and add it to your system's PATH environment variable. Java JDK is essential for running Kafka and its plugins.

6. **Git:** Ensure you have Git installed on your development machine. You can download it from [Git's official website](https://git-scm.com/downloads):

### Obtain your Connection String
Once the MongoDB Atlas Cluster is set up, locate your newly created cluster, click the "Connect" button and select the "Compass" section. Copy the provided connection string. It should resemble something like this:

```
mongodb+srv://<username>:<password>@cluster-name.xxxxx.mongodb.net/
```

> [!Note]
> You will need the connection string to set up your environment variables later (`MONGODB_URI`).
> Modify the username and password, make sure to use valid MongoDB credentials.

### Cloning the github repo.
Git is going to be used to clone the [demo app source code from GitHub](https://github.com/mongodb-industry-solutions/leafy_factory/tree/dev) to the development machine where the backend is going to be run.

1. Open a terminal or command prompt.
2. Navigate to your desired installation directory using the `cd` command.
    1. `cd /path/to/your/desired/directory`
    2. Remember this directory path, as you'll reference it later (INSTALLATION_PATH)
3. Clone the repository using the following command with the actual URL from the IST GitHub repo:
    1. `git clone https://github.com/mongodb-industry-solutions/leafy_factory.git`
4. After running the git clone command, a new directory with the repository's name will be created in your chosen directory. To navigate into the cloned repository, use the cd command:
    1. `cd leafy_factory/`

### Configuration of Python Virtual Environment and installation of Pip packages.
Python virtual environments help decouple and isolate Python installs and associated [pip packages](https://pypi.org/). This allows end-users to install and manage their own set of packages that are independent of those provided by the system or used by other projects.

1. First let’s create a python virtual environment within the leafy_factory directory. Navigate to the `leafy_factory` directory:
    1. `cd leafy_factory/`
2. Once there, create a virtual environment named `.venv`
    1. `python -m venv .venv`
3. Activate the created virtual environment.
    1. `source .venv/bin/activate`
    2. You should see the (.venv) at the beginning of your command prompt
4. Go to the backend directory which is located inside the leafy_factory directory.
    1. `cd backend/`
5. Install the required Python packages listed in `requirements.txt`
    1. `pip install -r requirements.txt`

### Environment variables configuration
Once you make sure that PostgreSQL is installed and running, execute the following commands to configure the server.

1. Navigate to the app directory within leafy_factory/backend
    1. `cd app/`
2. Create a file named `.env` and add the following lines, replacing placeholders with your actual credentials:

    ```
    MONGO_URI="mongodb+srv://<USER>:<PASSWORD>@<MONGODB_HOSTNAME>/?retryWrites=true&w=majority"
    BACKEND_URL="http://localhost:8000/"
    SQL_USERNAME="leafyfactory"
    SQL_PASSWORD="LeafyFactoryDemo"
    SQL_HOSTNAME="<YOUR POSTGRESQL Hostname. i.e: localhost>"
    SQL_DATABASE="leafyfactorydb"
    MQTT_TOPIC = "sensor/data"
    ```

### Starts the backend server.
Now that all the dependencies are installed and configured, the last step is to run the python backend server. 
1. Navigate to the backend directory
    1. `cd leafy_factory/backend`
2. Start the backend directory, make sure that you activated the virtual environment (.venv)
    1. `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

The backend should be up and running on **http://localhost:8000** If it doesn't work, ensure that you have followed all the steps and provided the correct environment variables.