# Leafy Factory backend

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white)
![Python](https://img.shields.io/badge/Python?style=for-the-badge&logo=next.js&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache%20Kafka-6DA55F?style=for-the-badge&logo=Apache-Kafka&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-%23323330.svg?style=for-the-badge&logo=MariaDB&logoColor=%23F7DF1E)

![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white)

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