from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
from psycopg_pool import ConnectionPool
from psycopg import OperationalError
from dotenv import load_dotenv
import os
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load values from .env file
load_dotenv()

# Access the MongoDB_URI and PostgreSQL variables.
MONGO_URI = os.getenv("MONGO_URI")
SQL_USERNAME = os.getenv("SQL_USERNAME")
SQL_PASSWORD = os.getenv("SQL_PASSWORD")
SQL_HOSTNAME = os.getenv("SQL_HOSTNAME")
SQL_DATABASE = os.getenv("SQL_DATABASE")

# This file defines the connection to our database, in this case the MongoDB Cluster.
mongo_conn = MongoClient(MONGO_URI, tls=True, tlsAllowInvalidCertificates=True)
motor_client = AsyncIOMotorClient(MONGO_URI)

# MongoDB Database connection
db = mongo_conn["leafy_factory"]
db_motor = motor_client["leafy_factory"]

# MongoDB Work Orders Collection
kfk_work_orders_coll = db["kafka.public.work_orders"]
motor_kfk_work_orders_coll = db_motor["kafka.public.work_orders"]

# MongoDB Products Collection
kfk_products_coll = db["kafka.public.products"]
products_coll = db["products"]

# MongoDB Jobs Collection
kfk_work_jobs_coll = db["kafka.public.jobs"]
motor_kfk_work_jobs_coll = db_motor["kafka.public.jobs"]

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

# PostgreSQL Connection Pool
sql_pool = None
sql_conn = None  # Keep for backward compatibility

def create_postgres_pool():
    """Create a PostgreSQL connection pool with proper error handling."""
    global sql_pool, sql_conn

    # Skip if credentials are placeholders or not set
    if not SQL_USERNAME or not SQL_PASSWORD or \
       SQL_USERNAME == "placeholder" or SQL_PASSWORD == "placeholder":
        logger.info("PostgreSQL credentials not configured - running without SQL connection")
        return None

    try:
        conninfo = (
            f"postgresql://{SQL_USERNAME}:{SQL_PASSWORD}@{SQL_HOSTNAME}/{SQL_DATABASE}"
            f"?keepalives=1&keepalives_idle=30&keepalives_interval=10&keepalives_count=5"
        )

        sql_pool = ConnectionPool(
            conninfo,
            min_size=2,
            max_size=10,
            max_idle=300,  # Close idle connections after 5 minutes
            max_lifetime=3600,  # Close connections after 1 hour
            timeout=30,
            check=ConnectionPool.check_connection,
            configure=configure_connection
        )

        # Test the pool
        with sql_pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1")
                logger.info("PostgreSQL connection pool created successfully")

        # Set sql_conn for backward compatibility
        sql_conn = SQLConnection(sql_pool)
        return sql_pool

    except Exception as e:
        logger.error(f"Failed to create PostgreSQL connection pool: {e}")
        return None

def configure_connection(conn):
    """Configure each connection when it's created."""
    conn.autocommit = False
    conn.prepare_threshold = 5
    return conn

class SQLConnection:
    """
    Simple wrapper that gets a fresh connection from the pool for each request.
    Uses contextvars to ensure thread/async safety.
    """
    def __init__(self, pool):
        self.pool = pool
        from contextvars import ContextVar
        self._connection_var = ContextVar('sql_connection', default=None)
        self._context_var = ContextVar('sql_context', default=None)

    def _get_connection(self):
        """Get or create connection for current context."""
        conn = self._connection_var.get()
        if conn is None:
            if not self.pool:
                raise OperationalError("PostgreSQL connection pool not available")
            ctx = self.pool.connection()
            conn = ctx.__enter__()
            self._connection_var.set(conn)
            self._context_var.set(ctx)
        return conn

    def _close_connection(self):
        """Close current context's connection and return to pool."""
        ctx = self._context_var.get()
        if ctx:
            try:
                ctx.__exit__(None, None, None)
            except Exception as e:
                logger.warning(f"Error closing connection: {e}")
            finally:
                self._connection_var.set(None)
                self._context_var.set(None)

    def cursor(self):
        """Get a cursor from the current context's connection."""
        return self._get_connection().cursor()

    def commit(self):
        """Commit and release connection back to pool."""
        conn = self._connection_var.get()
        if conn:
            conn.commit()
            self._close_connection()

    def rollback(self):
        """Rollback and release connection back to pool."""
        conn = self._connection_var.get()
        if conn:
            conn.rollback()
            self._close_connection()

    def __getattr__(self, name):
        """Forward any other attributes to the connection."""
        return getattr(self._get_connection(), name)

def get_sql_connection():
    """
    Get a connection from the pool. This function ensures the pool exists
    and returns a connection that can be used with context manager.
    """
    global sql_pool, sql_conn

    if not sql_pool:
        create_postgres_pool()

    if sql_pool:
        return sql_pool.connection()

    return None

def check_sql_health():
    """Check if PostgreSQL connection is healthy."""
    global sql_pool

    if not sql_pool:
        return False

    try:
        with sql_pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1")
                return True
    except Exception as e:
        logger.error(f"PostgreSQL health check failed: {e}")
        return False

def reconnect_sql_if_needed():
    """Reconnect to PostgreSQL if the connection is lost."""
    global sql_pool, sql_conn

    if not check_sql_health():
        logger.info("PostgreSQL connection lost, attempting to reconnect...")
        sql_pool = None
        sql_conn = None
        create_postgres_pool()
        return sql_conn is not None

    return True

# Initialize the connection pool on module load
create_postgres_pool()