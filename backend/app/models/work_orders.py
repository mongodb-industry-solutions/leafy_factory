from pydantic import BaseModel, Field
import datetime


class UpdateWorkOrder(BaseModel):
    # This model updates the work model and changes its status from CREATED to IN PROGRESS
    actual_start_date: datetime.datetime = Field(..., description = "Actual start date for the work order")
    actual_end_date: datetime.datetime = Field(..., description = "Actual end date for the work order")
    final_product_cost_per_job: dict = Field(default={}, description="JSON document that includes the actual cost of the work order")



# Pydantic model for work orders
class WorkOrder(BaseModel):
    planned_start_date: datetime.datetime = Field(..., description = "Planned start date for the work order")
    planned_end_date: datetime.datetime = Field(..., description = "Planned end date for the work order")
    actual_start_date: datetime.datetime = Field(default=None, description = "Date when actually the work order started")
    actual_end_date: datetime.datetime = Field(default=None, description = "Date when actually the work order ended")
    product_cat_id: int = Field(..., description = "ID of the product catalog, references to the products collection")
    quantity: int = Field(..., description = "Number of units that the work order will produce")
    status: str = Field(..., description = "Status of the work order it can be 'CREATED' or 'COMPLETED'")
    materials_used: list = Field(default=[], description="List of JSON documents that store the raw material used to create the final product")
    cost: dict = Field(default={}, description="JSON document that includes the planned and actual cost of the work order")