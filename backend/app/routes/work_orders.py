from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.models.work_orders import WorkOrder, UpdateWorkOrder
from app.database import sql_conn, kfk_work_orders_coll, kfk_products_coll, kfk_product_cost_coll
from pymongo.errors import DuplicateKeyError
import datetime
from bson.decimal128 import Decimal128


router = APIRouter()

# Create a Work Order into SQL table.
@router.post("/workorders",
             summary="Creates a new work order",
             description="This endpoint creates a new work order and inserts it into the leafy_factory MySQL database",
             responses={
                 201: {
                     "description": "Work order item successfully inserted",
                     "content": {
                         "application/json":{
                             "example": {"work_order_id" : "1"}
                         }
                     }
                 }
             })
def create_work_order(work_order: WorkOrder):
    # Check that the request includes required fields.
    # if not work_order.materials_used:
    #     raise HTTPException(
    #         status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
    #         detail="Work order ID, or Work order materials used and planned cost required."
    #     )
    
    workorder_json = work_order.model_dump()

    # It adds the creation_date field to the JSON document.
    workorder_json["creation_date"] = datetime.datetime.now()
    product_id = workorder_json["product_cat_id"]
    workorder_json["materials_used"] = []
    total_cost_work_order = 0
    overhead_per_product = 0.50

    try:
        query_get_raw_materials_id = """
                                        SELECT 
                                            raw_material_id, 
                                            item_code,
                                            cost_per_part,
                                            quantity,
                                            (quantity * cost_per_part) as cost_per_product
                                        FROM 
                                            products_raw_materials 
                                        INNER JOIN 
                                            raw_materials 
                                        ON 
                                            id_raw_material = raw_material_id 
                                        WHERE 
                                            product_id = %s
                                     """
        

        with sql_conn.cursor() as db_cur:
            # Retrieve the raw_materials_ids from the products_raw_materials table
            db_cur.execute(query_get_raw_materials_id, (product_id,))
            
            # Result example [(1,"hinges_ss", 1.50, 2),(2, "screw_ss", 0.05, 32),(3, "aluminum_6061", 3.00, 1.90), (4, "brackets_gs", 2.50, 8)]
            # item[0] = raw_material_id
            # item[1] = item_code
            # item[2] = cost_per_part
            # item[3] = quantity (Units need to create one product)
            # item[4] = cost_per_product
            raw_materials_list = db_cur.fetchall()
            
        
        for item in raw_materials_list:
            workorder_json["materials_used"].append(
                {   
                    "item_code": item[1], 
                    # Total Raw Material used per work order: quantity = (Quantity of products to create) * (quantity of every raw material)
                    # Example: 
                    # total_screw_ss = (10 units work order) * 32 (which is the total number of screws to create one unit of the product)
                    # Result:
                    # total_screw_ss = 320
                    "quantity": workorder_json["quantity"] * item[3],
                    "cost_per_part": item[2],
                    "cost_per_product": item[4]
                }
            )

            total_cost_work_order += item[4]
        
        total_cost_per_product = float(total_cost_work_order) + overhead_per_product
        total_cost_per_wo = workorder_json["quantity"] * total_cost_per_product

        workorder_json["cost"] = {
            "planned" : {
                "raw_material_cost_per_product" : float(total_cost_work_order),
                "overhead_per_product": overhead_per_product,
                "total_cost_per_product" : total_cost_per_product,
                "total_cost_per_wo": total_cost_per_wo
            }
        }

        # Modifies the raw_material stock from the raw_materials collection.
        for item in workorder_json["materials_used"]:

            # This is the value we want to update, in this case we want to decrease the stock number of the raw_materials
            item_code = item["item_code"]
            item_quantity = item["quantity"]
            update_raw_materials = f"UPDATE raw_materials SET raw_material_stock = raw_material_stock - {item_quantity} WHERE item_code = %s"
            
            with sql_conn.cursor() as db_cur:
                # Update the raw material stock for that specific item_code
                db_cur.execute(update_raw_materials, (item_code,))

            # Commit the changes
            sql_conn.commit()

        #     # Right now the function doensn't check if there is enough stock
        #     # TODO validate that there is enough stock before creating the work order.

        # Insert the work order into MariaDB
        insert_work_order = """
                            INSERT INTO work_orders (
                                planned_start_date, 
                                planned_end_date, 
                                quantity, 
                                wo_status, 
                                creation_date, 
                                product_id
                            )
                            VALUES (%s, %s, %s, %s, %s, %s)
                            RETURNING id_work;
                            """
        
        insert_cost_work_order ="""
                                INSERT INTO product_cost (
                                    raw_material_cost_per_product,
                                    overhead_per_product,
                                    total_cost_per_product,
                                    total_cost_per_wo,
                                    work_id
                                )
                                VALUES (%s, %s, %s, %s, %s);
                                """
        
        with sql_conn.cursor() as db_insert_cursor:
            db_insert_cursor.execute(insert_work_order, 
                                     (
                                        workorder_json["planned_start_date"],
                                        workorder_json["planned_end_date"],
                                        workorder_json["quantity"],
                                        workorder_json["status"],
                                        workorder_json["creation_date"],
                                        workorder_json["product_cat_id"],
                                     ))
            
            new_work_order_id = db_insert_cursor.fetchone()[0]

            db_insert_cursor.execute(insert_cost_work_order, 
                                     (
                                         workorder_json["cost"]["planned"]["raw_material_cost_per_product"],
                                         workorder_json["cost"]["planned"]["overhead_per_product"],
                                         workorder_json["cost"]["planned"]["total_cost_per_product"],
                                         workorder_json["cost"]["planned"]["total_cost_per_wo"],
                                         new_work_order_id,
                                     ))

            # Commit the insert operation.
            sql_conn.commit()
        
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"work_order_id": str(new_work_order_id)}
        )

    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A work order with this work_id already exists"
        )
    except Exception as e:
        sql_conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create work order: {str(e)}"
        )


# This API should get the data from MongoDB, the SQL data needs to be inserted into MongoDB to do so.
# Get the last 100 work orders
@router.get("/workorders",
            summary="Gets last 100 work orders",
            description="This endpoint gets an array with the 100 last work orders items from the leafy_factory database using the creation_date field as filter criteria",
            responses={
                200: {
                    "description": "Work orders list retrieved successfully",
                    "content": {
                        "application/json":{
                            "example":[
                                {
                                    "_id": {"id_work":2},
                                    "id_work":2,
                                    "planned_start_date":"2024-12-11T18:00:00",
                                    "planned_end_date":"2024-12-11T18:00:00",
                                    "actual_start_date":"2025-01-06T11:12:04",
                                    "actual_end_date":"2025-01-06T11:43:36",
                                    "quantity":10,
                                    "wo_status":"Completed",
                                    "creation_date":"2025-01-06T11:06:37",
                                    "product_id":2,
                                    "nOk_products":2,
                                    "product_name":"Titanium Hammer",
                                    "planned_cost":"15.32",
                                    "actual_cost": "null"
                                }
                            ]
                        }
                     }
                }
            })
def get_work_order():
    work_order_list= []
    try:
        work_order_cursor = kfk_work_orders_coll.find({},{"_insertedTS": 0, "_modifiedTS": 0}).limit(100).sort({"creation_date": -1})

        for workorder_item in work_order_cursor:
            
            product_item = kfk_products_coll.find_one({"id_product" : workorder_item["product_id"]})
            total_cost_wo = kfk_product_cost_coll.find_one({"work_id": workorder_item["id_work"]})

            workorder_item["product_name"] = product_item["product_name"]
            workorder_item["planned_cost"] = str(total_cost_wo["total_cost_per_wo"])
            # workorder_item["planned_cost"] = 0
            workorder_item["actual_cost"] = float(total_cost_wo["actual_total_cost"].to_decimal())if total_cost_wo["actual_total_cost"] != None else None
            # workorder_item["actual_cost"] = 0


            # Change datetime format from "2025-01-23T17:34:17.727506Z" to "2025-01-23 17:34:17"
            workorder_item["planned_start_date"] = str(datetime.datetime.fromisoformat(workorder_item["planned_start_date"]).strftime("%Y-%m-%d %H:%M:%S"))
            workorder_item["planned_end_date"] = str(datetime.datetime.fromisoformat(workorder_item["planned_end_date"]).strftime("%Y-%m-%d %H:%M:%S"))
            workorder_item["creation_date"] = str(datetime.datetime.fromisoformat(workorder_item["creation_date"]).strftime("%Y-%m-%d %H:%M:%S"))

            # In case the actual_start_date and actual_end_date is not set
            if workorder_item["actual_start_date"] != None:
                workorder_item["actual_start_date"] = str(datetime.datetime.fromisoformat(workorder_item["actual_start_date"]).strftime("%Y-%m-%d %H:%M:%S"))

            if workorder_item["actual_end_date"] != None:
                workorder_item["actual_end_date"] = str(datetime.datetime.fromisoformat(workorder_item["actual_end_date"]).strftime("%Y-%m-%d %H:%M:%S"))

            work_order_list.append(workorder_item)
        
        # Returns a list of JSON documents (work_order_list)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"list" : work_order_list}
        )
    except Exception as e:
        raise HTTPException (
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving work orders: {e}"
        )


#Update work order from Created to Completed
@router.put("/workorders/{work_id}",
            summary="Updates the work order status from 'Created' to 'Completed'",
            description="This endpoint updates the work_order items with status 'Created', adds the 'actual_start' and 'actual_end' and cost.actual fields, and changes the status of the work_order item",
            responses={
                200: {
                    "description": "Work order updated successfully",
                    "content": {
                         "application/json":{
                             "example": { "Result" : "True","Modified Count" : "1" , "Updated Document work_id" : "2" }
                         }
                     }
                }
            })
def update_work_order(work_id: int, updated_work_order: UpdateWorkOrder):
    if not updated_work_order.actual_start_date or not updated_work_order.actual_start_date:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The actual start date and actual end date are required to update the status of the work_order"
        )
    try:
        updated_workorder_json = updated_work_order.model_dump()
        work_order_status = "Completed"

        # Update the document, adding actual_start_date, actual_end_date and final_product_cost_per_job
        work_order_update_query = "UPDATE work_orders SET actual_start_date = %s, actual_end_date = %s, wo_status = %s, nOk_products = %s WHERE id_work = %s"
        cost_update_query = "UPDATE product_cost SET cost_ok_with_overhead = %s, cost_nok_with_overhead = %s, actual_total_cost = %s WHERE work_id = %s"

        with sql_conn.cursor() as db_cur:
            db_cur.execute(work_order_update_query, (
                updated_workorder_json["actual_start_date"],
                updated_workorder_json["actual_end_date"],
                work_order_status,
                updated_workorder_json['final_product_cost_per_job']['nOk_products'],
                work_id
            ),)

            # Get number of rows affected by the work order update
            total_wo_updated = db_cur.rowcount

            db_cur.execute(cost_update_query, (
                updated_workorder_json['final_product_cost_per_job']['cost_ok_with_overhead'],
                updated_workorder_json['final_product_cost_per_job']['cost_nok_with_overhead'],
                updated_workorder_json['final_product_cost_per_job']['total_cost'],
                work_id
            ),)

            # Get number of rows affected by the cost update
            total_product_cost_updated = db_cur.rowcount
            
            # Commit the update operations.
            sql_conn.commit()

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"Result": "True", 
                     "Modified Work Orders raws": str(total_wo_updated), 
                     "Modified Product Cost raws": str(total_product_cost_updated), 
                     "Updated Document work_id": str(work_id)}
        )
             
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update work order: {str(e)}"
        )