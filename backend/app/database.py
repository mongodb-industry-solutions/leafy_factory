from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
from psycopg import connect
from psycopg.errors import OperationalError
from dotenv import load_dotenv
import os
import time

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
motor_client = AsyncIOMotorClient(MONGO_URI)

# MongoDB Database connection
db = mongo_conn["leafy_factory"]
db_motor = motor_client["leafy_factory"]

# MongoDB Work Orders Collection
kfk_work_orders_coll = db["kafka.public.work_orders"]

# MongoDB Products Collection
kfk_products_coll = db["kafka.public.products"]
products_coll = db["products"]

# MongoDB Jobs Collection
kfk_work_jobs_coll = db["kafka.public.jobs"]

# MongoDB Raw Sensor Data Collection
raw_sensor_data_coll = db["raw_sensor_data"]
motor_raw_sensor_data_coll = db_motor["raw_sensor_data"]

# MongoDB Factories Collection
factories_data_coll = db["factories"]

# MongoDB Product Cost Collection
kfk_product_cost_coll = db["kafka.public.product_cost"]

# MongoDB Machines
kfk_machines_coll = db["kafka.public.machines"]

# MongoDB Production Data
kfk_production_data_coll = db["kafka.public.production_data"]

def get_sql_connection(retries=5, delay=5):
    """Attempt to connect to PostgreSQL with retries."""
    for attempt in range(retries):
        try:
            print(f"Attempt {attempt + 1} to connect to PostgreSQL...")
            sql_conn = connect(
                user=SQL_USERNAME,
                password=SQL_PASSWORD,
                host=SQL_HOSTNAME,
                dbname=SQL_DATABASE,
                keepalives=1,
                keepalives_idle=30,
                keepalives_interval=10,
                keepalives_count=5
            )
            print("Connected to PostgreSQL successfully")
            return sql_conn
        except OperationalError as e:
            print(f"Connection attempt {attempt + 1} failed: {e}")
            if attempt < retries - 1:
                time.sleep(delay)  # Wait before retrying
            else:
                print("All connection attempts failed. Exiting.")
                raise e  # Re-raise the exception if all attempts fail

# Access the SQL values.
try:
    sql_conn = connect(
        user=SQL_USERNAME, 
        password=SQL_PASSWORD,
        host=SQL_HOSTNAME,
        dbname=SQL_DATABASE,
        keepalives=1,
        keepalives_idle=30,
        keepalives_interval=10,
        keepalives_count=5
    )
except OperationalError as e:
    print(f"Error while connecting to PostgreSQL: {e}")