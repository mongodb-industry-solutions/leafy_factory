from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.models import WorkOrder
from app.database import work_orders_coll
from pymongo.errors import DuplicateKeyError


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

    try:
        # Insert the work order into MongoDB
        result_work_order = work_orders_coll.insert_one(work_order.model_dump())
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
    

# Get work order by work_id
@router.get("/workorders/{work_id}",
            summary="Gets a new work order by work_id",
            description="This endpoint gets an specified work order from the leafy_factory database using the work_id field",
            responses={
                200: {
                    "description": "Work order retrivied successfully"
                }
            })
def get_work_order(work_id: int):
    work_order_document = work_orders_coll.find_one({"work_id":work_id})
    if not work_order_document:
        raise HTTPException (
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Work order with work_id {work_id} not found"
        )
    work_order_document["_id"] = str(work_order_document["_id"])
    return work_order_document

