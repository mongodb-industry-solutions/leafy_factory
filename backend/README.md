# Leafy Factory backend

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache%20Kafka-231F20.svg?style=for-the-badge&logo=Apache-Kafka&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545.svg?style=for-the-badge&logo=MariaDB&logoColor=white)

## Prerequisites.

1. **Python (3.12 or higher):** The project relies on Python to run the backend and manage dependencies. It’s required to have python installed on the target machine. It’s recommended to download Python from the official website: [Python Downloads](https://www.python.org/downloads/). After installing Python, pip will be available by default.

2. **MariaDB (11.6.2 or higher):** MariaDB is the SQL database that will be used to simulate the ERP and MES systems. MariaDB could be downloaded [from the official website](https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.6.2). Remember to check that MariaDB is running after installing it.

3. **MongoDB Atlas Cluster (8.0.4 or higher):** MongoDB will be used as a unified namespace for the SQL systems: You can get If you don't have an account, you can sign up for free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register). Follow these steps to set up a minimum free tier cluster:

    1. Log in to your **MongoDB Atlas** account.
    2. Create a new project or use an existing one, and then click “create a new database”.
    3. Choose the free tier option (M0).
    4. You can choose the cloud provider of your choice but we recommend using the same provider and region both for the cluster and the app hosting in order to improve performance.
    5. Configure the cluster settings according to your preferences and then click “finish and close” on the bottom right.
    6. Finally, add your IP to the network access list so you can access your cluster remotely.

4. **Apache Kafka (3.9.0):** Used to transmit SQL data to a Kafka topic via the MySQL connector and consume it with the MongoDB Sink Connector, **this will be downloaded from a custom URL on the kafka installation section.**

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
    1. `source .venv/bin/Activate`
    2. You should see the (.venv) at the beginning of your command prompt
4. Go to the backend directory which is located inside the leafy_factory directory.
    1. `cd backend/`
5. Install the required Python packages listed in `requirements.txt`
    1. `pip install -r requirements.txt`

### Database configuration (MariaDB)
Once you make sure that MariaDB is installed and running, execute the following commands to configure the server.

1. Navigate to the app directory within leafy_factory/backend
    1. `cd app/`
2. Create a file named `.env` and add the following lines, replacing placeholders with your actual credentials:

    ```
    MONGO_URI="mongodb+srv://<USER>:<PASSWORD>@ist-shared.n0kts.mongodb.net/?retryWrites=true&w=majority&appName=IST-Shared"
    BACKEND_URL="http://localhost:8000/"
    MARIADB_USERNAME="root"
    MARIADB_PASSWORD="LeafyFactoryDemo"
    MARIADB_HOSTNAME="localhost"
    MARIADB_DATABASE="leafy_factory"
    ```

3. Navigate to the directory where the MariaDB configuration file is located by using the following command:
    1. `cd /opt/homebrew/etc/`

> [!Note]
> The previous command is executed based on a MariaDB installation executed with homebrew on MacOS. This could vary depending on your operating system, for Linux, the folder usually is `/etc/mariadb`.

4. Add the following lines to the MariaDB config file ´my.cnf´
    ```
    [mysqld]
    log_bin = /opt/homebrew/var/mysql/mariadb-bin
    binlog_format=ROW
    server_id = 1
    ```
5. Restart the MariaDB service, this command depends on the operating system. For MacOS and homembrew run the following command.
    1. `brew services restart mariadb`
6. Log in to MariaDB for the first time.
    1. `sudo mysql -u root`
7. For security reasons it’s required to set a password for the root user, execute the following two queries on the MariaDB command prompt.

    ```
    SET PASSWORD FOR 'root'@'localhost' = PASSWORD('LeafyFactoryDemo');
    FLUSH PRIVILEGES;
    ```
8. Close the MariaDB command prompt by typing the word “exit” on the prompt and log in again.
    1. `exit`
9. Navigate to the `leafy_factory/backend/app directory`.
10. Log in to MariaDB with your newly set password.
    1. `mysql -u root -p`
    2. Type your password when prompted: `LeafyFactoryDemo`.
11. Import the database schema. You can get `YOUR_PATH` by typing the `pwd` command, you’ll get something like this `/Users/ec2-user/leafy_factory/backend/app`.
    1. `pwd`
    2. `source <YOUR_PATH>/leafy_factory/backend/app/sql_data_schema.sql`
12. Exit MariaDB by typing exit in your terminal
    1. `exit`

### Kafka Installation and execution.
For the purpose of this demo, kafka is installed locally.
1. Download the kafka tar file from the following URL, ensure that the downloaded file is placed on the following directory `/leafy_factory/backend/`
    1. [Download Kafka](https://drive.google.com/file/d/1h_nU6uobU1-gbE-DQWU5ZIbUPPXn5yZs/view?usp=drive_link)
2. Extract the content of the tar file file with the following command, this is going to create a directory with kafka packages
    1. `tar -xvzf kafka_sql_mdb.tar.gz`
3. Navigate to the kafka config path which is located on the following directory:
    1. `cd /leafy_factory/backend/kafka_2.13-3.9.0/config/`
4. Add the following variable to the end of the file “connect-distributed.properties”, comment the variable in case it was added by default.
    1. `plugin.path=<YOUR_PATH>/leafy_factory/backend/kafka_2.13-3.9.0/plugins`
5. If you’re in the config directory, navigate to the following directory **kafka_2.13-3.9.0:**
    1. `cd..`
6. Execute the following command to start **zookeeper**.
    1. `bash bin/zookeeper-server-start.sh config/zookeeper.properties > zookeeper.logs 2>&1 & disown`
7. Execute the following command to start **kafka server**.
    1. `bash bin/kafka-server-start.sh config/server.properties > kafka_server.logs 2>&1 & disown`
8. Execute the following command to start kafka connect:
    1. `bash bin/connect-distributed.sh config/connect-distributed.properties > connect_server.logs 2>&1 & disown`
9. Make sure that you’re located in the kafka_2.13-3.9.0 directory.
    1. `cd /leafy_factory/backend/kafka_2.13-3.9.0`
10. Execute the following command to start the **MariaDB connecto**r
    1. `curl -X POST -H "Content-Type: application/json" --data @config/mariadb-connector.json http://localhost:8083/connectors`
11. Once the MariaDB connector is started, execute the following command to start the **MongoDB connector.**
    1. `curl -X POST -H "Content-Type: application/json" --data @config/mongodb-sink1.json http://localhost:8083/connectors`
12. Verify that kafka connectors were created successfully. First navigate to the following directory.
    1. `cd /leafy_factory/backend/kafka_2.13-3.9.0/`
13. Execute the following command, which lists all the existing **kafka topics**.
    1. `bash bin/kafka-topics.sh --list --bootstrap-server localhost:9092`
14. You should see listed the following topics:
    ```
    kafka.leafy_factory.factories
    kafka.leafy_factory.jobs
    kafka.leafy_factory.jobs_machines
    kafka.leafy_factory.machines
    kafka.leafy_factory.product_cost
    kafka.leafy_factory.production_lines
    kafka.leafy_factory.production_data
    kafka.leafy_factory.products
    kafka.leafy_factory.products_raw_materials
    kafka.leafy_factory.raw_materials
    kafka.leafy_factory.work_orders
    ```

### Starts the backend server.
Now that all the dependencies are installed and configured, the last step is to run the python backend server. 
1. Navigate to the backend directory
    1. `cd leafy_factory/backend`
2. Start the backend directory, make sure that you activated the virtual environment (.venv)
    1. `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

The backend should be up and running on **http://localhost:8000** If it doesn't work, ensure that you have followed all the steps and provided the correct environment variables.