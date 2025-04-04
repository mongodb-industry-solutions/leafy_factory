from fastapi import APIRouter, HTTPException, status
from app.database import raw_sensor_data_coll, factories_data_coll, kfk_machines_coll, kfk_work_orders_coll
from app.models.machines import MachineHeartbeat
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
import json
from collections import OrderedDict

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
            machine_item['last_maintenance'] = str(datetime.fromisoformat(machine_item["last_maintenance"]).strftime("%Y-%m-%d %H:%M:%S"))
            machine_item['last_updated'] = str(machine_item['last_updated'])
            machine_item['_insertedTS'] = str(machine_item['_insertedTS'])
            machine_item['_modifiedTS'] = str(machine_item['_modifiedTS'])
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"result": machines_docs_to_list}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve machine details: {str(e)}")
    

@router.get("/machines/machine_details/{id_machine}",
                summary="Returns the machine details by id_machine",
                description="",
                responses={
                    200: {
                        "description": "Returns full details of a machine, including, work orders and jobs processed by the machine",
                        "content": {
                            "application/json":{
                                "factory": {
                                    "location": "qro_fact_1",
                                    "timestamp": "2025-03-19 16:40:17.013268",
                                    "production_lines": [
                                        {
                                            "production_line_id": 1,
                                            "machines": [
                                                {
                                                    "_id": 1,
                                                    "machine_id": 1,
                                                    "details": {
                                                        "machine_status": "Available",
                                                        "last_maintenance": "2024-10-31 14:25:00",
                                                        "operator": "Ada Lovelace",
                                                        "avg_temperature": "70.27",
                                                        "avg_vibration": "0.002",
                                                        "temp_values": 70,
                                                        "vib_values": 0.01
                                                    },
                                                    "work_orders": [
                                                        {
                                                            "id_work": 3,
                                                            "nok_products": 10,
                                                            "quantity": 10,
                                                            "wo_status": "Completed",
                                                            "jobs": [
                                                                {
                                                                    "id_job": 4,
                                                                    "creation_date": "2025-01-28T18:04:06.641978Z",
                                                                    "job_status": "Completed",
                                                                    "nok_products": 10,
                                                                    "quality_rate": 0,
                                                                    "target_output": 10
                                                                }
                                                            ],
                                                            "products": [
                                                                {
                                                                    "product_name": "2 Step ladder"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            )
async def retrieve_machine_details(id_machine: int):
    """This endpoint retrieves the machine details from the jobs, products and work_orders collections."""
    
    # The demo currently work with only one factory
    FACTORY_ID = "qro_fact_1"

    # TODO Retrieved the production lines from the MongoDB production_lines collection
    PRODUCTION_LINE_ID = [1, 2]

    machine_details_dict = {}

    factory_dict = {
        "factory": {
            "location": "Plant A",
            "timestamp": datetime.now()
        }
    }

    prod_line_dict = {}

    try:
        # MongoDB Aggregation stages

        # This stage joins the work_orders with the jobs colelction
        lookup_jobs_stage = {
            "$lookup": {
                "from": "kafka.public.jobs",
                "localField": "id_work",
                "foreignField": "work_id",
                "as": "jobs",
                "pipeline": [
                    {
                        "$project": {                            
                            # "job_status": 1,
                            # "nok_products": 1,
                            # "target_output": 1,
                            "_id": 0,
                            "id_job": 1
                        }
                    }
                ]
            }
        }

        # This stage sorts the workorders descendant by ID
        sort_workorders_stage = {
            "$sort": {
                "id_work": -1
            }
        }

        # This stage joins the jobs with the products collection
        lookup_products_stage = {
            "$lookup": {
                "from": "kafka.public.products",
                "localField": "product_id",
                "foreignField": "id_product",
                "as": "products",
                "pipeline": [
                    {
                        "$project": {
                            "_id": 0,
                            "product_name": 1
                        }
                    }
                ]
            }
        }

        # This stage joins the jobs with the jobs_machines collection
        lookup_jobs_machines_stage = {
            "$lookup": {
                "from": "kafka.public.jobs_machines",
                "localField": "jobs.id_job",
                "foreignField": "job_id",
                "as": "job_machines"
            }
        }
        
        # This stage separates the elements of jobs_machines
        lookup_unwind_stage = {
            "$unwind": {
                "path": "$job_machines",
                "preserveNullAndEmptyArrays": True
            }
        }

        # This stage groups the elements by machine_id and aggregate work_orders per machine
        lookup_group_stage = {
            "$group": {
                "_id": "$job_machines.machine_id",
                "machine_id": { 
                    "$first": "$job_machines.machine_id" 
                },
                "work_orders": {
                    "$push": {
                        "id_work": "$id_work",
                        # "nok_products": "$nok_products",
                        # "quantity": "$quantity",
                        # "wo_status": "$wo_status",
                        "jobs": "$jobs"
                        # "products": "$products"
                    }
                }
            }
        }

        # This stage projects the fields the query will show
        lookup_project_stage = {
            "$project": {
                "machine_id": 1,
                # The "$slice": ["$work_orders", 5] defines the number of workorders to show.
                "work_orders": { "$slice": ["$work_orders", 5] }
            }
        }

        # This stage matches the id_machine we are looking for
        match_project_stage = {
            "$match": {
                "machine_id": id_machine
            }
        }

        # Execute the aggregation against the work_orders collection.
        machine_details_cursor = kfk_work_orders_coll.aggregate(
            [
                sort_workorders_stage, 
                lookup_jobs_stage,
                lookup_products_stage, 
                lookup_jobs_machines_stage,
                lookup_unwind_stage, 
                lookup_group_stage, 
                lookup_project_stage,
                match_project_stage
            ]
        )

        machine_details_list = machine_details_cursor.to_list()

        # Retrieve machine details:
        machine_details_doc = kfk_machines_coll.find_one({"id_machine": machine_details_list[0]["machine_id"]})
        machine_details_dict["machine_status"] = machine_details_doc["machine_status"]
        machine_details_dict["last_maintenance"] = str(datetime.fromisoformat(machine_details_doc["last_maintenance"]).strftime("%Y-%m-%d %H:%M:%S"))
        machine_details_dict["operator"] = machine_details_doc["operator"]
        machine_details_dict["avg_temperature"] = machine_details_doc["avg_temperature"]
        machine_details_dict["avg_vibration"] = machine_details_doc["avg_vibration"]
        machine_details_dict["temp_values"] = float(machine_details_doc['temp_values'].to_decimal())
        machine_details_dict["vib_values"] = float(machine_details_doc['vib_values'].to_decimal())

        machine_details_list[0]["details"] = machine_details_dict

        # machine_details_list and machine_details_dict are already defined
        updated_list = []

        for item in machine_details_list:
            # Create a new dictionary with keys ordered as desired
            updated_item = OrderedDict()
            updated_item["_id"] = item["_id"]
            updated_item["machine_id"] = item["machine_id"]
            updated_item["details"] = machine_details_dict
            updated_item["work_orders"] = item["work_orders"]

            # Add the updated item to the new list
            updated_list.append(updated_item)

        # Adding the production line to the document
        if updated_list[0]["machine_id"] == 1 or updated_list[0]["machine_id"] == 2:
            production_line = PRODUCTION_LINE_ID[0]
        elif updated_list[0]["machine_id"] == 3 or updated_list[0]["machine_id"] == 4:
            production_line = PRODUCTION_LINE_ID[1]

        # Adding the updated_list dict to the production_lines dict
        prod_line_dict = {
            "production_lines": [
                {
                    "production_line_id": production_line,
                    "machines": updated_list
                }
            ]
            
        }

        # Adding the updated_list dict to the production_lines dict
        machine_details_dict = {
            "factory": {
                "location": FACTORY_ID,
                "timestamp": str(datetime.now()),
                "production_lines": prod_line_dict["production_lines"]
            }
        }

         # Print the updated JSON object
        print(json.dumps(machine_details_dict, indent=4))

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"result": machine_details_dict}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve machine details: {str(e)}")
    