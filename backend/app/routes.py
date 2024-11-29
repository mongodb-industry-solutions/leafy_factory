from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from .models import WorkOrder
from .database import work_orders_coll

router = APIRouter()

# Work Orders API
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
    if not work_order.work_id or not work_order.materials_used or not work_order.planned_cost:
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
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create work order: {str(e)}"
        )