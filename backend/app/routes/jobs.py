from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.models.job_task import JobTask, UpdateJob
from app.database import jobs_coll, work_orders_coll
from pymongo.errors import DuplicateKeyError
import datetime


router = APIRouter()


# Create a Job Task 
@router.post("/jobs/",
             summary="Creates a job task",
             description="This endpoint creates a Job Task in the leafy_factory database",
             responses={
                 201: {
                     "description": "Job task created successfully ",
                     "content": {
                         "application/json":{
                             "example": {"job_id" : "6749f5ecddd88e151653ea33"}
                         }
                     }
                 }
             })
def create_job(job_task: JobTask):
    # Check that the request includes required fields.
    if not job_task.work_order_id or not job_task.factory or not job_task.target_output:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Work order ID, or target_output or target_output not found on the Job request."
        )
    
    job_task_json = job_task.model_dump()

    # It adds the creation_date field to the JSON document.
    job_task_json["creation_date"] = datetime.datetime.now()
    job_task_json["status"] = "Created"

    try:
        # Insert the job task into MongoDB
        result_job_task = jobs_coll.insert_one(job_task_json)

        # Modify the status of the work order from "Created" to "In Progress"
        wo_filter = {
            "work_id" : job_task_json['work_order_id']
        }

        update_wo_values = {
            "$set" : {
                "status": "In Progress",
                "actual_start_date": datetime.datetime.now()
            }
        }

        update_wo_result = work_orders_coll.update_one(wo_filter, update_wo_values)

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"Created _id: ": str(result_job_task.inserted_id), "job_id": str(job_task_json["job_id"])}
        )
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A Job task with this job_id already exists"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create the job task: {str(e)}"
        )
    

# Get the last 100 job tasks
@router.get("/jobs/",
            summary="Gets last 100 job tasks",
            description="This endpoint gets an array with the 100 last 100 job items from the leafy_factory database using the creation_date field as filter criteria",
            responses={
                200: {
                    "description": "Jobs list retrivied successfully",
                    "content": {
                        "application/json":{
                            "example":[
                                {
                                    "_id":"6757700add1de5828d1e598c",
                                    "job_id":2,
                                    "work_order_id":2,
                                    "factory": {
                                        "factory_id": "qro_fact_1",
                                        "production_lines": [
                                            {
                                                "production_line_id":1,
                                                "machines": [ 1, 2 ]
                                            }
                                        ]
                                    },
                                    "target_output": 10,
                                    "nok_products": 0,
                                    "quality_rate": 0,
                                    "creation_date": "2024-12-09T16:32:42.523000",
                                    "status": "Created"
                                }
                            ]
                        }
                    }
                }
            })
def get_jobs():
    job_list= []
    jobs_cursor = jobs_coll.find().limit(100).sort({"creation_date": -1})

    for job_item in jobs_cursor:
        job_item["_id"] = str(job_item["_id"])
        job_list.append(job_item)

    if not job_list:
        raise HTTPException (
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job task not found"
        )
    
    #Returns a list of JSON documents (job_list)
    return job_list


#Update jobs from Created to Completed
@router.put("/jobs/{job_id}",
            summary="Updates the job task status from 'Created' to 'Completed'",
            description="This endpoint updates the jobs items with status 'Created', adds the completion_date, nok_products, quality_rate, and changes the status of the job task",
            responses={
                200: {
                    "description": "Job updated successfully",
                    "content": {
                         "application/json":{
                             "example": { "Result" : "True", "Modified Count" : "1" , "Updated Document job_id" : "2" }
                         }
                     }
                }
            })
def update_job_task(job_id: int, updated_job_task: UpdateJob):
    if not updated_job_task.nok_products or not updated_job_task.quality_rate:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The number of no ok products and quality rate are required."
        )
    try:
        updated_job_json = updated_job_task.model_dump()

        # Update the document, adding actual_start_date, actual_end_date and actual.final_product_cost_per_job
        update_filter = {
            "job_id" : job_id
        }

        update_expression = {
            "$set" : {
                "completion_date" : datetime.datetime.now(),
                "nok_products" : updated_job_json['nok_products'],
                "quality_rate" : updated_job_json['quality_rate'],
                "status" : "Completed"
            }
        }

        update_job_result = jobs_coll.update_one(update_filter, update_expression)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"Result": str(update_job_result.acknowledged), 
                     "Modified Count": str(update_job_result.modified_count), 
                     "Updated Document job_id": str(job_id)}
        )
             
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update job task: {str(e)}"
        )