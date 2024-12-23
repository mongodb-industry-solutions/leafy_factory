from pymongo import MongoClient
from mariadb import connect
from dotenv import load_dotenv
import os

# Load values from .env file
load_dotenv()

# Access the MongoDB_URI and MARIADB variables.
MONGO_URI = os.getenv("MONGO_URI")
MARIADB_USERNAME=os.getenv("MARIADB_USERNAME")
MARIADB_PASSWORD=os.getenv("MARIADB_PASSWORD")
MARIADB_HOSTNAME=os.getenv("MARIADB_HOSTNAME")
MARIADB_DATABASE=os.getenv("MARIADB_DATABASE")

# This file defines the connection to our database, in this case the MongoDB Cluster.
mongo_conn = MongoClient(MONGO_URI)

db = mongo_conn["leafy_factory"]
work_orders_coll = db["work_orders"]
products_coll = db["products"]
raw_materials_coll = db["raw_materials"]
jobs_coll = db["jobs"]
machine_data_coll = db["machine_data"]
raw_sensor_data_coll = db["raw_sensor_data"]
factories_data_coll = db["factories"]

# Access the MariaDB values.
mariadb_conn = connect(
    user=MARIADB_USERNAME, 
    password=MARIADB_PASSWORD,
    host=MARIADB_HOSTNAME,
    database=MARIADB_DATABASE
)

# mariadb_cur = mariadb_conn.cursor()
# item_code = "screw_ss"
# query = "SELECT * FROM raw_materials WHERE item_code = %s"

# mariadb_cur.execute(query, (item_code,))
# query_result = mariadb_cur.fetchall()

# for i in query_result:
#     print(query_result)