from fastapi import APIRouter, HTTPException, status
from app.database import machine_data_coll
from fastapi.responses import JSONResponse
import boto3

router = APIRouter()
# Initialize AWS Lambda client
lambda_client = boto3.client('lambda', region_name='us-east-2')

@router.post("/start-factory")
def start_factory():
    machines = ["Machine_1", "Machine_2", "Machine_3", "Machine_4"]
    responses = []

    for machine_id in machines:
        payload = {
            "machine_id" : machine_id,
            "heartbeat_url" : "https://your-backend-url.com/machines/heartbeat",
            "runtime": 600,
            "thresholds": {
                "vibration": [0.1, 5.0], 
                "temperature": [20.0, 80.0]
            }
        }

        response = lambda_client.invoke(
            FunctionName = "leafyFactoryTest",
            InvocationType = "Event",
            Payload = json.dumps(payload)
        )