from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.models.job_task import JobTask
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