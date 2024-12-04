from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.models import WorkOrder, UpdateWorkOrder
from app.database import work_orders_coll
from pymongo.errors import DuplicateKeyError
import datetime


router = APIRouter()


# Create a Work Order
@router.post("/workorders/",
             summary="Creates a new work order",
             description="This endpoint creates a new work order in the leafy_factory database",
             responses={
                 201: {
                     "description": "Work order item successfully inserted",
                     "content": {
                         "application/json":{
                             "example":[
                                 {"work_order_id" : "6749f5ecddd88e151653ea33"}
                             ]
                         }
                     }
                 }
             })
def create_work_order(work_order: WorkOrder):
    print(work_order.work_id)
    # Check that the request includes required fields.
    if not work_order.work_id or not work_order.materials_used or not work_order.cost:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Work order ID, or Work order materials used and planned cost required."
        )
    
    workorder_json = work_order.model_dump()

    # It adds the creation_date field to the JSON document.
    workorder_json["creation_date"] = datetime.datetime.now()

    try:
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
                    "description": "Work orders list retrivied successfully"
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


# #Update work order from Created to Completed
# @router.put("/workoders/{work_id}",
#             summary="Updates the work order status from 'Created' to 'In Progress'",
#             description="This endpoint updates the work_order items with status 'Created', adds the 'actual_start' and 'actual_end' fields, and changes the status of the work_order item",
#             responses={
#                 200: {
#                     "description": "Work order updated successfully"
#                 }
#             })