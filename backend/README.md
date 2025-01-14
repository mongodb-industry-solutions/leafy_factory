# Installation of Leafy Factory backend

## Prerequisites.

1. Python (3.12 or higher): The project relies on Python to run the backend and manage dependencies. It’s required to have python installed on the target machine. It’s recommended to download Python from the official website: Python Downloads. After installing Python, pip will be available by default.

2. MariaDB (11.6.2 or higher): MariaDB is the SQL database that will be used to simulate the ERP and MES systems. MariaDB could be downloaded from the official website. Remember to check that MariaDB is running after installing it.

3. MongoDB Atlas Cluster (8.0.4 or higher): MongoDB will be used as a unified namespace for the SQL systems: You can get If you don't have an account, you can sign up for free at MongoDB Atlas. Follow these steps to set up a minimum free tier cluster:

    a) Log in to your MongoDB Atlas account.
    b) Create a new project or use an existing one, and then click “create a new database”.
    c) Choose the free tier option (M0).
    d) You can choose the cloud provider of your choice but we recommend using the same provider and region both for the cluster and the app hosting in order to improve performance.
    e) Configure the cluster settings according to your preferences and then click “finish and close” on the bottom right.
    f) Finally, add your IP to the network access list so you can access your cluster remotely.
