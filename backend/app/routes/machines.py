from fastapi import APIRouter, HTTPException, status
from app.database import machine_data_coll
from app.models.machines import MachineHeartbeat
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta

router = APIRouter()

def get_bucket_time(timestamp):
    # list_time will store the start_date and end_date
    list_time = []
    start_date = timestamp.replace(minute=0, second=0, microsecond=0)
    end_date = start_date + timedelta(hours=1, seconds=-1)
    
    list_time.append(start_date)
    list_time.append(end_date)

    return list_time

@router.post("/machines/heartbeat")
async def receive_heartbeat(data: MachineHeartbeat):
    """This endpoint inserts the heartbeat data sent from Lambda to MongoDB database"""
    try:
        heartbeat_record = {
            "factory_id": data.factory_id,
            "production_line_id": data.production_line_id,
            "machine_id": data.machine_id,
            "vibration": data.vibration,
            "temperature": data.temperature,
            "timestamp": data.timestamp
        }

        print(heartbeat_record['timestamp'])
        
        # list_time[0] includes start_date
        # list_time[1] includes end_date
        list_time = get_bucket_time(heartbeat_record['timestamp'])

        # Bucket filter query
        filter_query = {
            "start_date": list_time[0],
            "end_date": list_time[1],
            "factory.factory_id": heartbeat_record["factory_id"],
            "factory.production_lines.machine.machine_id": heartbeat_record["machine_id"]
        }

        # Define the update operation
        update_query = {
            "$push": {
                "measurements": {
                    "timestamp": heartbeat_record["timestamp"],
                    "temperature": heartbeat_record["temperature"],
                    "vibration": heartbeat_record["vibration"]
                }
            },
            "$inc": {
                "transaction_count": 1,
                "sum_temperature": heartbeat_record["temperature"],
                "sum_vibration": heartbeat_record["vibration"]
            },
            "$setOnInsert": {
                "start_date": list_time[0],
                "end_date": list_time[1],
                "factory": {
                    "factory_id": heartbeat_record["factory_id"],
                    "production_lines": [
                        {
                            "production_line_id": heartbeat_record["production_line_id"],
                            "machine": {
                                "machine_id": heartbeat_record["machine_id"]
                            }
                        }
                    ]
                }
            }
        }

        # Insert or update the bucket
        update_result = machine_data_coll.update_one(filter_query, update_query, upsert=True)
        print(f"Upserted ID: {update_result.upserted_id}")
        print(f"Result: {update_result.acknowledged}")

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"machine_data_id": str(r"test_123")}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save heartbeat: {str(e)}")