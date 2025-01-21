from fastapi import APIRouter, HTTPException, status
from app.database import machine_data_coll, raw_sensor_data_coll, factories_data_coll, kfk_machines_coll
from app.models.machines import MachineHeartbeat, MachineValue
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


@router.get("/machines/factory_details",
                summary="Gets the factory details",
                description="This endpoint retrieves the factory details:",
                responses={
                    200: {
                        "description": "Work orders list retrieved successfully",
                        "content": {
                            "application/json":{
                                "example":[
                                    {
                                        "_id": {"id_machine":1}, 
                                        "id_machine": 1,
                                        "machine_status": "Available",
                                        "last_maintenance": "2024-10-31 08:25:00",
                                        "operator": "Ada Lovelace",
                                        "avg_output": "3000.0",
                                        "reject_count": "25.0", 
                                        "production_line_id": 1,
                                        "avg_temperature": "75.20692473272969",
                                        "avg_vibration": "26.44509863592196",
                                        "last_updated": "2025-01-16 22:56:00.061000"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
async def retrieve_factory_details():
    """This endpoint retrieves the factory details from the factory collection"""
    try:
        factory_details = factories_data_coll.find()
        factories_docs_to_list = list(factory_details)

        factories_docs_to_list[0]["_id"] = str(factories_docs_to_list[0]["_id"])
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"result": factories_docs_to_list} 
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve machine details: {str(e)}")


@router.get("/machines/machine_details",
                summary="Gets the machine details",
                description="This endpoint retrieves the machine details information, it shows the machine status, avg temperate vibration, etc.",
                responses={
                    200: {
                        "description": "Work orders list retrieved successfully",
                        "content": {
                            "application/json":{
                                "example":[
                                    {
                                        "_id": {"id_machine":1}, 
                                        "id_machine": 1,
                                        "machine_status": "Available",
                                        "last_maintenance": "2024-10-31 08:25:00",
                                        "operator": "Ada Lovelace",
                                        "avg_output": "3000.0",
                                        "reject_count": "25.0", 
                                        "production_line_id": 1,
                                        "avg_temperature": "75.20692473272969",
                                        "avg_vibration": "26.44509863592196",
                                        "last_updated": "2025-01-16 22:56:00.061000"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
async def retrieve_machine_details():
    """This endpoint retrieves the machine details from the factory collection"""
    try:

        machine_details_docs = kfk_machines_coll.find()
        machines_docs_to_list = list(machine_details_docs)

        for machine_item in machines_docs_to_list:
            machine_item['avg_output'] = float(machine_item['avg_output'].to_decimal())
            machine_item['reject_count'] = float(machine_item['reject_count'].to_decimal())
            machine_item['temp_values'] = float(machine_item['temp_values'].to_decimal())
            machine_item['vib_values'] = float(machine_item['vib_values'].to_decimal())
            machine_item['last_maintenance'] = str(datetime.fromtimestamp(machine_item["last_maintenance"]/1000))
            machine_item['last_updated'] = str(machine_item['last_updated'])
            machine_item['_insertedTS'] = str(machine_item['_insertedTS'])
            machine_item['_modifiedTS'] = str(machine_item['_modifiedTS'])
        
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