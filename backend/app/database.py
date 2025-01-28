from pymongo import MongoClient
from psycopg import connect
from psycopg.errors import OperationalError
from dotenv import load_dotenv
import os

# Load values from .env file
load_dotenv()

# Access the MongoDB_URI and MARIADB variables.
MONGO_URI = os.getenv("MONGO_URI")
SQL_USERNAME=os.getenv("SQL_USERNAME")
SQL_PASSWORD=os.getenv("SQL_PASSWORD")
SQL_HOSTNAME=os.getenv("SQL_HOSTNAME")
SQL_DATABASE=os.getenv("SQL_DATABASE")

# This file defines the connection to our database, in this case the MongoDB Cluster.
mongo_conn = MongoClient(MONGO_URI, tls=True, tlsAllowInvalidCertificates=True)

# MongoDB Database connection
db = mongo_conn["leafy_factory"]

# MongoDB Work Orders Collection
kfk_work_orders_coll = db["kafka.leafy_factory.work_orders"]

# MongoDB Products Collection
kfk_products_coll = db["kafka.leafy_factory.products"]
products_coll = db["products"]

# MongoDB Jobs Collection
kfk_work_jobs_coll = db["kafka.leafy_factory.jobs"]

# MongoDB Raw Sensor Data Collection
raw_sensor_data_coll = db["raw_sensor_data"]

# MongoDB Factories Collection
factories_data_coll = db["factories"]

# MongoDB Product Cost Collection
kfk_product_cost_coll = db["kafka.leafy_factory.product_cost"]

# MongoDB Machines
kfk_machines_coll = db["kafka.leafy_factory.machines"]

# MongoDB Production Data
kfk_production_data_coll = db["kafka.leafy_factory.production_data"]

# Access the SQL values.
try:
    sql_conn = connect(
        user=SQL_USERNAME, 
        password=SQL_PASSWORD,
        host=SQL_HOSTNAME,
        dbname=SQL_DATABASE
    )
except OperationalError as e:
    print(f"Error while connecting to PostgreSQL: {e}")