from fastapi import FastAPI
from app.routes.work_orders import router as work_orders_router
from app.routes.products import router as products_router
from app.routes.jobs import router as jobs_router
from app.routes.machines import router as test_router
from app.routes.lambda_routes import router as lambda_routes

app = FastAPI(title="Leafy Factory APIs")

# Include the created routes
app.include_router(work_orders_router)
app.include_router(products_router)
app.include_router(jobs_router)
app.include_router(lambda_routes, prefix="/lambda", tags=["Lambda Operations"])
app.include_router(test_router)