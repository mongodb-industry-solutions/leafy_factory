# Installation of Leafy Factory backend

## Prerequisites.

1. Python (3.12 or higher): The project relies on Python to run the backend and manage dependencies. It’s required to have python installed on the target machine. It’s recommended to download Python from the official website: [Python Downloads](https://www.python.org/downloads/). After installing Python, pip will be available by default.

2. MariaDB (11.6.2 or higher): MariaDB is the SQL database that will be used to simulate the ERP and MES systems. MariaDB could be downloaded from the official website. Remember to check that MariaDB is running after installing it.

3. MongoDB Atlas Cluster (8.0.4 or higher): MongoDB will be used as a unified namespace for the SQL systems: You can get If you don't have an account, you can sign up for free at MongoDB Atlas. Follow these steps to set up a minimum free tier cluster:

    1. Log in to your MongoDB Atlas account.
    2. Create a new project or use an existing one, and then click “create a new database”.
    3. Choose the free tier option (M0).
    4. You can choose the cloud provider of your choice but we recommend using the same provider and region both for the cluster and the app hosting in order to improve performance.
    5. Configure the cluster settings according to your preferences and then click “finish and close” on the bottom right.
    6. Finally, add your IP to the network access list so you can access your cluster remotely.

4. Apache Kafka: Used to transmit SQL data to a Kafka topic via the MySQL connector and consume it with the MongoDB Sink Connector, this will be downloaded from a custom URL on the kafka installation section.

5. Install Java JDK (Minimum version 23): Install the Java JDK from the official website e and add it to your system's PATH environment variable. Java JDK is essential for running Kafka and its plugins.

6. Git: Ensure you have Git installed on your development machine. You can download it from the official website: