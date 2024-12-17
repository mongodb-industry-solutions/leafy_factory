import json
import random
import requests
from datetime import datetime

def lambda_handler(event, context):
    machine_id = event.get("machine_id", "Machine_1")
    heartbeat_url = event.get("heartbeat_url", "https://your-fastapi-url.com/machines/heartbeat")

    # Simulate telemetry
    vibration = round(random.uniform(0.5, 1.5), 2)
    temperature = round(random.uniform(30, 80), 2)

    data = {
        "machine_id": machine_id,
        "vibration": vibration,
        "temperature": temperature,
        "timestamp": datetime.utcnow().isoformat()
    }

    # Send the heartbeat to the backend
    response = requests.post(heartbeat_url, json=data)
    return {
        "statusCode": response.status_code,
        "body": json.dumps({
            "message": "Heartbeat sent",
            "data": data
        })
    }