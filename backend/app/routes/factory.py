from fastapi import APIRouter, HTTPException, status
from app.database import machine_data_coll
from fastapi.responses import JSONResponse
import json
import boto3

router = APIRouter()
# Initialize AWS Lambda client
lambda_client = boto3.client('lambda', region_name='us-east-2')

@router.post("/start-factory")
def start_factory():
    
    # Right now this Demo only has one factory and two production lines, each production line has two machines
    # Ideally production_line_ids and machine_ids should come from the database
    # TODO Modify the production_line_ids and machine_ids to read the data from the database

    factory_id = "qro_fact_1"
    production_line_ids = [1, 2]
    machine_ids = [1, 2]

    responses = []

    for production_line in production_line_ids:
        for machine in machine_ids:
            payload = {
                "factory_id" : factory_id,
                "production_line_id" : production_line,
                "machine_id": machine_ids,
                "heartbeat_url" : "https://b3f5-2a09-bac0-1000-417-00-9f-38.ngrok-free.app/machines/heartbeat",
                "runtime": 600,
                "sensor_thresholds": {
                    "vibration": [0.1, 10.0],
                    "temperature": [20.0, 100.0]
                }
            }
            
            response = lambda_client.invoke(
                FunctionName = "leafyFactoryTest",
                InvocationType = "Event",
                Payload = json.dumps(payload)
            )

        