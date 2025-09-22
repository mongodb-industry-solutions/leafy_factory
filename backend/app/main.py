from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.work_orders import router as work_orders_router
from app.routes.products import router as products_router
from app.routes.jobs import router as jobs_router
from app.routes.machine_simulator import router as machines_router
from app.routes.machines import router as machines_status
from app.routes.change_stream_listener import router as ws_stream_sensor
from app.routes.stream_workorders import router as ws_stream_workorders
from app.routes.stream_jobs import router as ws_stream_jobs
from app.database import mongo_conn, sql_conn

def is_sql_available():
    """Check if SQL connection is available and working"""
    try:
        if sql_conn is None:
            return False
        with sql_conn.cursor() as cursor:
            cursor.execute("SELECT 1")
            return True
    except Exception:
        return False

app = FastAPI(title="Leafy Factory APIs")


# Configure CORS (Allow React app origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the created routes
app.include_router(work_orders_router)
app.include_router(products_router)
app.include_router(jobs_router)
app.include_router(machines_router)
app.include_router(machines_status)
app.include_router(ws_stream_sensor)
app.include_router(ws_stream_workorders)
app.include_router(ws_stream_jobs)

@app.get("/")
async def health_check():
    return {"status": "healthy", "service": "factory-backend", "version": "1.0.0"}

@app.get("/health")
async def health():
    try:
        # Test MongoDB connection
        mongo_status = "connected"
        try:
            mongo_conn.admin.command('ping')
        except:
            mongo_status = "disconnected"
            
        # Check SQL status
        sql_status = "connected" if is_sql_available() else "not_configured"
        
        return {
            "status": "healthy",
            "mongodb": mongo_status,
            "postgresql": sql_status,
            "message": "PostgreSQL will be configured later" if sql_status == "not_configured" else "All systems operational"
        }
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
