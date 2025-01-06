from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.models.work_orders import WorkOrder, UpdateWorkOrder
from app.database import work_orders_coll, raw_materials_coll, mariadb_conn, kfk_work_orders_coll, kfk_products_coll, kfk_product_cost_coll
from pymongo.errors import DuplicateKeyError
import datetime, decimal


router = APIRouter()

# Create a Work Order into SQL table.
@router.post("/workorders/",
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
    if not work_order.work_id or not work_order.materials_used:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Work order ID, or Work order materials used and planned cost required."
        )
    
    workorder_json = work_order.model_dump()

    # It adds the creation_date field to the JSON document.
    workorder_json["creation_date"] = datetime.datetime.now()


    try:

        # Modifies the raw_material stock from the raw_materials collection.
        for item in workorder_json["materials_used"]:

            # This is the value we want to update, in this case we want to decrease the stock number of the raw_materials
            item_code = item["item_code"]
            item_quantity = item["quantity"]
            update_raw_materials = f"UPDATE raw_materials SET raw_material_stock = raw_material_stock - {item_quantity} WHERE item_code = %s"
            
            with mariadb_conn.cursor() as db_cur:
                # Update the raw material stock for that specific item_code
                db_cur.execute(update_raw_materials, (item_code,))

            # Commit the changes
            mariadb_conn.commit()

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
                            VALUES (?,?,?,?,?,?)
                            """
        
        insert_cost_work_order ="""
                                INSERT INTO product_cost (
                                    raw_material_cost_per_product,
                                    overhead_per_product,
                                    total_cost_per_product,
                                    work_id
                                )
                                VALUES (?,?,?,?)
                                """
        
        with mariadb_conn.cursor() as db_insert_cursor:
            db_insert_cursor.execute(insert_work_order, 
                                     (
                                        workorder_json["planned_start_date"],
                                        workorder_json["planned_end_date"],
                                        workorder_json["quantity"],
                                        workorder_json["status"],
                                        workorder_json["creation_date"],
                                        workorder_json["product_cat_id"],
                                     ))
            
            new_work_order_id = db_insert_cursor.lastrowid

            db_insert_cursor.execute(insert_cost_work_order, 
                                     (
                                         workorder_json["cost"]["planned"]["raw_material_cost_per_product"],
                                         workorder_json["cost"]["planned"]["overhead_per_product"],
                                         workorder_json["cost"]["planned"]["total_cost_per_product"],
                                         new_work_order_id,
                                     ))
            
            new_work_cost_id = db_insert_cursor.lastrowid

            # Commit the insert operation.
            mariadb_conn.commit()
        
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
        mariadb_conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create work order: {str(e)}"
        )


#########################################################
#########################################################
###### THIS API INSERTS A WORKORDER INTO MONGODB ########
#########################################################
#########################################################

# # Create a Work Order
# @router.post("/workorders/",
#              summary="Creates a new work order",
#              description="This endpoint creates a new work order in the leafy_factory database -> work_orders collection",
#              responses={
#                  201: {
#                      "description": "Work order item successfully inserted",
#                      "content": {
#                          "application/json":{
#                              "example": {"work_order_id" : "6749f5ecddd88e151653ea33"}
#                          }
#                      }
#                  }
#              })
# def create_work_order(work_order: WorkOrder):
#     # Check that the request includes required fields.
#     if not work_order.work_id or not work_order.materials_used:
#         raise HTTPException(
#             status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
#             detail="Work order ID, or Work order materials used and planned cost required."
#         )
    
#     workorder_json = work_order.model_dump()

#     # It adds the creation_date field to the JSON document.
#     workorder_json["creation_date"] = datetime.datetime.now()


#     try:

#         # Modifies the raw_material stock from the raw_materials collection.
#         for item in workorder_json["materials_used"]:
            
#             # Sets the filter we will use to find the raw_material 
#             filter_update_raw_materials = {
#                 "item_code" : item["item_code"]
#             }

#             # This is the value we want to update, in this case we want to decrease the stock number of the raw_materials
#             # $inc can be used with negative values to perform a decrease operation.
#             update_value = {
#                 "$inc" : {
#                     "stock" : float(item["quantity"]) * -1
#                 }
#             }

#             # Right now the function doensn't validate if there is enough stock
#             # TODO validate that there is enough stock before creating the work order.
#             update_result = raw_materials_coll.update_one(
#                 filter_update_raw_materials, 
#                 update_value
#             )

#         # Insert the work order into MongoDB
#         result_work_order = work_orders_coll.insert_one(workorder_json)
#         return JSONResponse(
#             status_code=status.HTTP_201_CREATED,
#             content={"work_order_id": str(result_work_order.inserted_id)}
#         )
#     except DuplicateKeyError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="A work order with this work_id already exists"
#         )
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to create work order: {str(e)}"
#         )



# Getting the data from the kafka collections
# @router.get("/workorders/",
#             summary="Gets last 100 work orders",
#             description="This endpoint gets an array with the 100 last work orders items from the leafy_factory database using the creation_date field as filter criteria",
#             responses={
#                 200: {
#                     "description": "Work orders list retrivied successfully",
#                     "content": {
#                         "application/json":{
#                             "example":[
#                                 {
#                                     "_id":"67520135d3401bb2618bf44c",
#                                     "work_id": 2,
#                                     "planned_start_date":"2024-12-12T00:00:00",
#                                     "planned_end_date":"2024-12-12T00:00:00",
#                                     "actual_start_date":"2024-12-12T00:00:00",
#                                     "actual_end_date":"2024-12-12T00:00:00",
#                                     "product_cat_id":2,
#                                     "quantity":10,
#                                     "status":"Created",
#                                     "materials_used":[
#                                         {
#                                             "item_code":"aluminum_6061",
#                                             "quantity":19
#                                         },
#                                         {
#                                             "item_code":"hinges_ss",
#                                             "quantity":20
#                                         },
#                                         {
#                                             "item_code":"brackets_gs",
#                                             "quantity":80
#                                         },
#                                         {
#                                             "item_code":"screw_ss",
#                                             "quantity":320
#                                         }
#                                     ],
#                                     "cost": {
#                                         "planned": {
#                                             "raw_material_cost_per_product":14.82,
#                                             "overhead_per_product":0.5,
#                                             "total_cost_per_product":15.32
#                                         },
#                                         "actual": {
#                                             "final_product_cost_per_job": {
#                                                 "cost_ok_with_overhead":12.5,
#                                                 "cost_nok_with_overhead":2.5,
#                                                 "nOk_products":2,"total_cost":15
#                                             }
#                                         }
#                                     },
#                                     "creation_date":"2024-12-05T13:38:29.179000"}
#                             ]
#                         }
#                      }
#                 }
#             })
# def get_work_order():
#     work_order_list= []
#     work_order_cursor = work_orders_coll.find().limit(100).sort({"creation_date": -1})

#     for workorder_item in work_order_cursor:
#         workorder_item["_id"] = str(workorder_item["_id"])
#         work_order_list.append(workorder_item)


#     if not work_order_list:
#         raise HTTPException (
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Work orders not found"
#         )
    
#     #Returns a list of JSON documents (work_order_list)
#     return work_order_list


# Getting the data from the kafka collections
# TODO
# This API should get the data from MongoDB, the SQL data needs to be inserted into MongoDB to do so.
# Get the last 100 work orders
@router.get("/workorders/",
            summary="Gets last 100 work orders",
            description="This endpoint gets an array with the 100 last work orders items from the leafy_factory database using the creation_date field as filter criteria",
            responses={
                200: {
                    "description": "Work orders list retrivied successfully",
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
    work_order_cursor = kfk_work_orders_coll.find({},).limit(100).sort({"creation_date": -1})

    for workorder_item in work_order_cursor:
        
        product_item = kfk_products_coll.find_one({"id_product" : workorder_item["product_id"]})
        total_cost_wo = kfk_product_cost_coll.find_one({"work_id": workorder_item["id_work"]})
        
        workorder_item["product_name"] = product_item["product_name"]
        workorder_item["planned_cost"] = str(total_cost_wo["total_cost_per_product"])
        workorder_item["actual_cost"] = total_cost_wo["actual_total_cost"]

        # Change datetime format from epoch to timestamp
        workorder_item["planned_start_date"] = datetime.datetime.fromtimestamp(workorder_item["planned_start_date"]/1000)
        workorder_item["planned_end_date"] = datetime.datetime.fromtimestamp(workorder_item["planned_end_date"]/1000)
        workorder_item["creation_date"] = datetime.datetime.fromtimestamp(workorder_item["creation_date"]/1000)

        
        # In case the actual_start_date and actual_end_date is not set
        if workorder_item["actual_start_date"] != None:
            workorder_item["actual_start_date"] = datetime.datetime.fromtimestamp(workorder_item["actual_start_date"]/1000)

        if workorder_item["actual_end_date"] != None:
            workorder_item["actual_end_date"] = datetime.datetime.fromtimestamp(workorder_item["actual_end_date"]/1000)
            

        work_order_list.append(workorder_item)


    if not work_order_list:
        raise HTTPException (
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Work orders not found"
        )
    
    #Returns a list of JSON documents (work_order_list)
    return work_order_list


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

        # Update the document, adding actual_start_date, actual_end_date and actual.final_product_cost_per_job
        work_order_update_query = f"UPDATE work_orders SET actual_start_date = %s, actual_end_date = %s, wo_status = %s, nOk_products = %s WHERE id_work = {work_id}"
        cost_update_query = f"UPDATE product_cost SET cost_ok_with_overhead = %s, cost_nok_with_overhead = %s, actual_total_cost = %s WHERE work_id = {work_id}"

        with mariadb_conn.cursor() as db_cur:
            db_cur.execute(work_order_update_query, (
                updated_workorder_json["actual_start_date"],
                updated_workorder_json["actual_end_date"],
                work_order_status,
                updated_workorder_json['final_product_cost_per_job']['nOk_products']
            ),)

            total_wo_updated = db_cur.rowcount

            db_cur.execute(cost_update_query, (
                updated_workorder_json['final_product_cost_per_job']['cost_ok_with_overhead'],
                updated_workorder_json['final_product_cost_per_job']['cost_nok_with_overhead'],
                updated_workorder_json['final_product_cost_per_job']['total_cost'],
            ),)

            total_product_cost_updated = db_cur.rowcount
            
            # Commit the update operations.
            mariadb_conn.commit()

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


#########################################################
#########################################################
###### THIS API UPDATES A WORKORDER FROM MONGODB ########
#########################################################
#########################################################

#Update work order from Created to Completed
# @router.put("/workorders/{work_id}",
#             summary="Updates the work order status from 'Created' to 'Completed'",
#             description="This endpoint updates the work_order items with status 'Created', adds the 'actual_start' and 'actual_end' and cost.actual fields, and changes the status of the work_order item",
#             responses={
#                 200: {
#                     "description": "Work order updated successfully",
#                     "content": {
#                          "application/json":{
#                              "example": { "Result" : "True","Modified Count" : "1" , "Updated Document work_id" : "2" }
#                          }
#                      }
#                 }
#             })
# def update_work_order(work_id: int, updated_work_order: UpdateWorkOrder):
#     if not updated_work_order.actual_start_date or not updated_work_order.actual_start_date:
#         raise HTTPException(
#             status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
#             detail="The actual start date and actual end date are required to update the status of the work_order"
#         )
#     try:
#         updated_workorder_json = updated_work_order.model_dump()
        
#         # Get the work order from the database
#         work_order_doc = work_orders_coll.find_one({"work_id" : work_id})

#         # Update the document, adding actual_start_date, actual_end_date and actual.final_product_cost_per_job
#         update_filter = {
#             "work_id" : work_id
#         }

#         update_expression = {
#             "$set" : {
#                 "actual_start_date" : updated_workorder_json['actual_start_date'],
#                 "actual_end_date" : updated_workorder_json['actual_end_date'],
#                 "status": "Completed",
#                 "cost.actual.final_product_cost_per_job": updated_workorder_json['final_product_cost_per_job']
#             }
#         }

#         update_work_order_result = work_orders_coll.update_one(update_filter, update_expression)
#         return JSONResponse(
#             status_code=status.HTTP_200_OK,
#             content={"Result": str(update_work_order_result.acknowledged), 
#                      "Modified Count": str(update_work_order_result.modified_count), 
#                      "Updated Document work_id": str(work_id)}
#         )
             
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to update work order: {str(e)}"
#         )