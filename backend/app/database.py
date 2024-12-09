from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load values from .env file
load_dotenv()

# Access the MongoDB_URI variable
MONGO_URI = os.getenv("MONGO_URI")

# This file defines the connection to our database, in this case the MongoDB Cluster.
mongo_conn = MongoClient(MONGO_URI)

db = mongo_conn["leafy_factory"]
work_orders_coll = db["work_orders"]
products_coll = db["products"]
raw_materials_coll = db["raw_materials"]
jobs_coll = db["jobs"]