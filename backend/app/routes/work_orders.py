from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.models.work_orders import WorkOrder, UpdateWorkOrder
from app.database import work_orders_coll, raw_materials_coll
from pymongo.errors import DuplicateKeyError
import datetime


router = APIRouter()


# Create a Work Order
@router.post("/workorders/",
             summary="Creates a new work order",
             description="This endpoint creates a new work order in the leafy_factory database -> work_orders collection",
             responses={
                 201: {
                     "description": "Work order item successfully inserted",
                     "content": {
                         "application/json":{
                             "example": {"work_order_id" : "6749f5ecddd88e151653ea33"}
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
            
            # Sets the filter we will use to find the raw_material 
            filter_update_raw_materials = {
                "item_code" : item["item_code"]
            }

            # This is the value we want to update, in this case we want to decrease the stock number of the raw_materials
            # $inc can be used with negative values to perform a decrease operation.
            update_value = {
                "$inc" : {
                    "stock" : float(item["quantity"]) * -1
                }
            }

            # Right now the function doensn't validate if there is enough stock
            # TODO validate that there is enough stock before creating the work order.
            update_result = raw_materials_coll.update_one(
                filter_update_raw_materials, 
                update_value
            )

        # Insert the work order into MongoDB
        result_work_order = work_orders_coll.insert_one(workorder_json)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"work_order_id": str(result_work_order.inserted_id)}
        )
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A work order with this work_id already exists"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create work order: {str(e)}"
        )
    

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
                                 {"_id":"67520135d3401bb2618bf44c","work_id":2,"planned_start_date":"2024-12-12T00:00:00","planned_end_date":"2024-12-12T00:00:00","actual_start_date":"2024-12-12T00:00:00","actual_end_date":"2024-12-12T00:00:00","product_cat_id":2,"quantity":10,"status":"Created","materials_used":[{"item_code":"aluminum_6061","quantity":19},{"item_code":"hinges_ss","quantity":20},{"item_code":"brackets_gs","quantity":80},{"item_code":"screw_ss","quantity":320}],"cost":{"planned":{"raw_material_cost_per_product":14.82,"overhead_per_product":0.5,"total_cost_per_product":15.32},"actual":{"final_product_cost_per_job":{"cost_ok_with_overhead":12.5,"cost_nok_with_overhead":2.5,"nOk_products":2,"total_cost":15}}},"creation_date":"2024-12-05T13:38:29.179000"}
                             ]
                         }
                     }
                }
            })
def get_work_order():
    work_order_list= []
    work_order_cursor = work_orders_coll.find().limit(100).sort({"creation_date": -1})

    for workorder_item in work_order_cursor:
        workorder_item["_id"] = str(workorder_item["_id"])
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
        
        # Get the work order from the database
        work_order_doc = work_orders_coll.find_one({"work_id" : work_id})

        # Update the document, adding actual_start_date, actual_end_date and actual.final_product_cost_per_job
        update_filter = {
            "work_id" : work_id
        }

        update_expression = {
            "$set" : {
                "actual_start_date" : updated_workorder_json['actual_start_date'],
                "actual_end_date" : updated_workorder_json['actual_end_date'],
                "status": "Completed",
                "cost.actual.final_product_cost_per_job": updated_workorder_json['final_product_cost_per_job']
            }
        }

        update_work_order_result = work_orders_coll.update_one(update_filter, update_expression)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"Result": str(update_work_order_result.acknowledged), 
                     "Modified Count": str(update_work_order_result.modified_count), 
                     "Updated Document work_id": str(work_id)}
        )
             
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update work order: {str(e)}"
        )