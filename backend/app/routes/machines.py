from fastapi import APIRouter, HTTPException, status
from app.database import machine_data_coll
from app.models.machines import MachineHeartbeat
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/machines/heartbeat")
async def receive_heartbeat(data: MachineHeartbeat):
    """This endpoint inserts the heartbeat data sent from Lambda to MongoDB database"""
    
    try:
        heartbeat_record = {
            "machine_id": data.machine_id,
            "vibration": data.vibration,
            "temperature": data.temperature,
            "timestamp": data.timestamp
        }

        print(heartbeat_record)

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"machine_data_id": str(r"test_123")}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save heartbeat: {str(e)}")