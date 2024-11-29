from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="Leafy Factory APIs")

# Include the created routes
app.include_router(router)