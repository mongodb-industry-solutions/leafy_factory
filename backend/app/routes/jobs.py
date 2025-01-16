from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.models.job_task import JobTask, UpdateJob
from app.database import mariadb_conn, kfk_work_jobs_coll
from pymongo.errors import DuplicateKeyError
from apscheduler.schedulers.background import BackgroundScheduler
import datetime, random, time, requests
from dotenv import load_dotenv
import os

# Load values from .env file
load_dotenv()

# Access the MongoDB_URI and MARIADB variables.
BACKEND_URL = os.getenv("BACKEND_URL")

# Initialize APScheduler
scheduler = BackgroundScheduler()
scheduler.start()

router = APIRouter()


def complete_job_task(job_id, quantity, machines_list):
    # Represents the time that it takes the machine to produce a brand new part, by default 2 seconds
    time_to_produce_part = 2
    nok_products = 0
    ok_products = 0

    try:
        for item in range(0, quantity):
            machine_to_insert = random.choice(machines_list)
            part_status = "OK"
            
            if part_status == "nOK":
                nok_products += 1
            else:
                ok_products += 1

            insert_part_query =  """
                                INSERT INTO production_data(machine_id, part_status, job_id, creation_date)
                                VALUES (?,?,?,?)
                            """
            
            db_cur = mariadb_conn.cursor()
            
            db_cur.execute(insert_part_query, 
                                (
                                    machine_to_insert,
                                    part_status,
                                    job_id,
                                    datetime.datetime.now(),
                                ))
            print(f"Part ID: {db_cur.lastrowid}, Status: Created")
            time.sleep(time_to_produce_part)
        mariadb_conn.commit()

        backend_update_job_url = f"{BACKEND_URL}/jobs/{job_id}"
        quality_rate = ((quantity - nok_products) * 100) / quantity
        

        payload = {
            "nok_products": nok_products,
            "quality_rate": quality_rate
        }

        print(payload)

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.put(backend_update_job_url, json=payload, headers=headers)
        # Check response status of update job API
        if response.status_code == 200:
            print(f"API called successfully for work_order_id: {job_id}")
        else:
            print(f"Failed to call API: {response.status_code}, {response.text}")
    except mariadb_conn.Error as e:
        print(f"Error completing Jobs: {e}")
    except requests.RequestException as e:
        print(f"Error calling API: {e}")


# Create a Job Task 
# Create a Job Task into an SQL table.
@router.post("/jobs/",
             summary="Creates a job task",
             description="This endpoint creates a Job Task in the leafy_factory SQL database",
             responses={
                 201: {
                     "description": "Job task created successfully ",
                     "content": {
                         "application/json":{
                             "example": {"id_job" : "1"}
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
    work_order_status = "In Progress"
    machine_status = "Running"

    # It adds the creation_date field to the JSON document.
    job_task_json["creation_date"] = datetime.datetime.now()
    job_task_json["status"] = "Created"

    try:

        # Inserts the job task into SQL
        insert_job_query = """
                            INSERT INTO jobs(target_output, job_status, creation_date, work_id)
                            VALUES (?,?,?,?)
                           """
        
        
        # Inserts a new row into the jobs_machines table
        insert_job_machine_query =  """
                                        INSERT INTO jobs_machines(job_id, machine_id)
                                        VALUES (?,?)
                                    """
        
        # Updates the status from "Created" to "In Progress" and the actual start_date of the work order
        updates_work_order =    f"""
                                    UPDATE work_orders 
                                    SET 
                                        wo_status = '{work_order_status}',
                                        actual_start_date = '{job_task_json['creation_date']}'
                                    WHERE id_work = {job_task_json['work_order_id']}
                                """
        
        # Updates the machine's status.
        updates_machine_status =    f"""
                                        UPDATE machines
                                        SET
                                            machine_status = "{machine_status}"
                                        WHERE id_machine = %s
                                    """
            
        
        with mariadb_conn.cursor() as db_cur:
            db_cur.execute(insert_job_query, 
                                (
                                    job_task_json["target_output"],
                                    job_task_json["status"],
                                    job_task_json["creation_date"],
                                    job_task_json["work_order_id"],
                                ))
            
            new_job_id = db_cur.lastrowid

            # Updates the work order's status
            db_cur.execute(updates_work_order)

            for machine_id in job_task_json["factory"]["production_lines"][0]["machines"]:
                db_cur.execute(insert_job_machine_query, 
                                (
                                   new_job_id,
                                   machine_id,
                                ))
                
                db_cur.execute(updates_machine_status,
                               (
                                    machine_id,
                               ))

        # Commit the changes
        mariadb_conn.commit()

        # Schedule the completion of the work order
        scheduler.add_job(
            func=complete_job_task,
            trigger="date",
            run_date=datetime.datetime.now() + datetime.timedelta(seconds=2),  # Change 20 seconds to the desired time
            
            # This function receives as argument the Job ID, the quantity of items to bre produces, and the machines to perform the job.
            args=[new_job_id, job_task_json["target_output"], job_task_json["factory"]["production_lines"][0]["machines"]],
        )

        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"job_id": str(new_job_id)}
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
                    "description": "Jobs list retrieved successfully",
                    "content": {
                        "application/json":{
                            "example":[
                                {
                                    "_id": {"id_job":5},
                                    "id_job":5,
                                    "target_output":10,
                                    "nOk_products": "null",
                                    "quality_rate": "null",
                                    "job_status": "Created",
                                    "creation_date": 1736239372000, 
                                    "work_id":8
                                }
                            ]
                        }
                    }
                }
            })
def get_jobs():
    job_list= []
    jobs_cursor = kfk_work_jobs_coll.find().limit(100).sort({"creation_date": -1})

    for job_item in jobs_cursor:
        job_list.append(job_item)

    if not job_list:
        raise HTTPException (
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job task not found"
        )
    
    #Returns a list of JSON documents (job_list)
    return job_list


#Update jobs from Created to Completed using an SQL database.
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
    if not updated_job_task.quality_rate:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The number of no ok products and quality rate are required."
        )
    try:
        job_status = "Completed"
        machine_status = "Available"
        
        updated_job_json = updated_job_task.model_dump()

        query_get_work_id = f"SELECT work_id FROM jobs WHERE id_job = {job_id}"
        query_get_machines = f"SELECT machine_id FROM jobs_machines WHERE job_id = {job_id}"
        query_cost_product = f"SELECT total_cost_per_product, total_cost_per_wo FROM product_cost WHERE work_id = %s"
        
        # List of machines that are executing the job.
        machine_id_list = []

        # Get the number of no ok parts produces by the job
        total_nok_parts = updated_job_json['nok_products']

        with mariadb_conn.cursor() as db_cur_query:
            db_cur_query.execute(query_get_work_id)
            
            # The result of this operation is a tuple, i.e: (9,)
            work_tuple = db_cur_query.fetchone()
            work_id = work_tuple[0]

            db_cur_query.execute(query_get_machines)
            machines_result_query = db_cur_query.fetchall()

            db_cur_query.execute(query_cost_product, (work_id,))
            cost_product_result = db_cur_query.fetchone()

            # cost_product_result[0] = total_cost_per_product
            # cost_product_result[1] = total_cost_per_wo

            # Calculate the cost for no ok parts and actual cost of work_order
            total_cost_nok_with_overhead = total_nok_parts * float(cost_product_result[0])
            actual_cost_wo = total_cost_nok_with_overhead + float(cost_product_result[1])
            
            for machine_details in machines_result_query:
                # The index [0] stores the machine_id of the query result
                machine_id_list.append(machine_details[0])

        update_job_query =  f"""
                                UPDATE 
                                    jobs 
                                SET 
                                    nOk_products = {updated_job_json['nok_products']}, 
                                    quality_rate = {updated_job_json['quality_rate']},
                                    job_status = '{job_status}'
                                WHERE
                                    id_job = {job_id}
                            """
        
        update_work_order_query =  f"""
                                UPDATE 
                                    work_orders 
                                SET 
                                    nOk_products = {updated_job_json['nok_products']},
                                    actual_end_date = '{datetime.datetime.now()}',
                                    wo_status = '{job_status}'
                                WHERE
                                    id_work = {work_id}
                            """
        
        update_product_cost_query =  f"""
                                UPDATE 
                                    product_cost 
                                SET 
                                    cost_nok_with_overhead = {total_cost_nok_with_overhead},
                                    actual_total_cost = {actual_cost_wo}
                                WHERE
                                    work_id = {work_id}
                            """

        with mariadb_conn.cursor() as db_cur:
            # Adding this query inside the with block, since we are updating more than one machine.
            db_cur.execute(update_job_query)
            updated_job_count = db_cur.rowcount
            
            # Initially this variable is set to 0, it will be increased according to the number of machines that are updated
            updated_machines_count = 0
            
            db_cur.execute(update_work_order_query)
            updated_wo_count = db_cur.rowcount

            db_cur.execute(update_product_cost_query)
            updated_pc_count = db_cur.rowcount

            for machine_id in machine_id_list:
                update_machines =  f"""
                                    UPDATE 
                                        machines 
                                    SET 
                                        machine_status = '{machine_status}'
                                    WHERE
                                        id_machine = {machine_id}
                                """
                db_cur.execute(update_machines)
                updated_machines_count += db_cur.rowcount

        # Commit the changes
        mariadb_conn.commit()

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content = {
                "Result": "True" if updated_job_count and updated_wo_count and updated_machines_count > 0 else "False", 
                "Modified Job Count": updated_job_count, 
                "Modified Work Order Count": updated_wo_count, 
                "Modified Product Cost Count": updated_pc_count,
                "Modified Machines Count": updated_machines_count, 
                "Updated Document job_id": str(job_id)
            }
        )
             
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update job task: {str(e)}"
        )