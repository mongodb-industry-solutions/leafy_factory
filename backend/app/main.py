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