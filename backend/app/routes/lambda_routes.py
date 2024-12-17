import boto3
import json
from fastapi import APIRouter
from pydantic import BaseModel
from app.models.lambda_requests import SimulationRequest

router = APIRouter()


# Initialize AWS Lambda client
lambda_client = boto3.client('lambda', region_name='us-east-2')


@router.post("/start-simulation")
async def start_simulation(request: SimulationRequest):
    """Invoke the Lambda function to start a machine simulation."""
    machine_id = request.machine_id
    heartbeat_url = request.heartbeat_url

    response = lambda_client.invoke(
        FunctionName='leafyFactoryTest',
        InvocationType='Event',
        Payload=json.dumps({"machine_id": machine_id, "heartbeat_url": "https://b3f5-2a09-bac0-1000-417-00-9f-38.ngrok-free.app/machines/heartbeat"})
    )
    return {"status": "Simulation started", "machine_id": machine_id}


@router.post("/stop-simulation")
async def stop_simulation():
    """Placeholder for stopping the simulation."""
    # Add logic for managing stop actions if required.
    # TODO
    return {"status": "Simulation stop functionality not yet implemented"}
