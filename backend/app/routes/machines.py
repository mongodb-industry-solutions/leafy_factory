from fastapi import APIRouter, HTTPException, status
from app.database import machine_data_coll, raw_sensor_data_coll, factories_data_coll, kfk_machines_coll
from app.models.machines import MachineHeartbeat, MachineStatus, MachineDetails
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from bson import Decimal128
from decimal import Decimal

router = APIRouter()

def get_bucket_time(timestamp):
    # list_time will store the start_date and end_date
    list_time = []
    start_date = timestamp.replace(minute=0, second=0, microsecond=0)
    end_date = start_date + timedelta(hours=1, seconds=-1)
    
    list_time.append(start_date)
    list_time.append(end_date)

    return list_time


@router.put("/machines/change_status")
async def update_status_machine(data: MachineStatus):
    """This endpoint updates the machine status: it could be <available, running, maintenance>"""
    try:
        machine_status_record = {

        }
    except Exception as e:
        pass


@router.post("/machines/ts_heartbeat")
async def receive_ts_heartbeat(data: MachineHeartbeat):
    """This endpoint inserts the heartbeat sent in timeseries format to MongoDB time series collection"""
    try: 
        # The variable "data" receives the data sent from machine
        heartbeat_record = {
            "timestamp": datetime.now(),
            "metadata": {
                "factory_id": data.factory_id,
                "prod_line_id": data.production_line_id,
                "machine_id": data.machine_id
            },
            "vibration": data.vibration,
            "temperature": data.temperature
        }

        insert_heartbeat_result = raw_sensor_data_coll.insert_one(heartbeat_record)
        print(f"Inserted ID: {insert_heartbeat_result.inserted_id}")

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"inserted id ": str(insert_heartbeat_result.inserted_id)}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save heartbeat: {str(e)}")


@router.get("/machines/machine_details")
async def retrieve_machine_details():
    """This endpoint retrieves the machine details from the factory collection"""
    try:

        machine_details_docs = kfk_machines_coll.find()
        machines_docs_to_list = list(machine_details_docs)

        for machine_item in machines_docs_to_list:
            machine_item['avg_output'] = float(machine_item['avg_output'].to_decimal())
            machine_item['reject_count'] = float(machine_item['reject_count'].to_decimal())
            machine_item['last_maintenance'] = str(datetime.fromtimestamp(machine_item["last_maintenance"]/1000))
        
        # # List comprehension to filter only the data that we want
        # filtered_machines_list = [
        #     {
        #         "machine_id": item["machine_id"],
        #         "status": item["status"],
        #         "last_maintenance": item["last_maintenance"]
        #     }
        #     for item in machines_list
        # ]

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"result": machines_docs_to_list}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve machine details: {str(e)}")


@router.post("/machines/heartbeat")
async def receive_heartbeat(data: MachineHeartbeat):
    """This endpoint inserts the heartbeat data sent from Lambda to MongoDB database using bucket pattern"""
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