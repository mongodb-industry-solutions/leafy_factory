from fastapi import FastAPI
from app.routes.work_orders import router as work_orders_router

app = FastAPI(title="Leafy Factory APIs")

# Include the created routes
app.include_router(work_orders_router)