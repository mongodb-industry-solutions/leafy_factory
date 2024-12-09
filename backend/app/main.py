from fastapi import FastAPI
from app.routes.work_orders import router as work_orders_router
from app.routes.products import router as products_router
from app.routes.jobs import router as jobs_router

app = FastAPI(title="Leafy Factory APIs")

# Include the created routes
app.include_router(work_orders_router)
app.include_router(products_router)
app.include_router(jobs_router)