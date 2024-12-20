from pydantic import BaseModel, Field
import datetime


class MachineDetails(BaseModel):
    factory_id: str = Field(..., description = "Factory ID")
    production_line_id: str = Field(..., description = "Production Line ID")


class MachineStatus(BaseModel):
    factory_id: str = Field(..., description = "Factory ID")
    production_line_id: str = Field(..., description = "Production Line ID")
    machine_id: str = Field(..., description = "Machine ID")
    status: str = Field(..., description = "Machine status, it could be <available, running, maintenance>")
    timestamp: datetime.datetime = Field(default = None, description = "Timestamp of when the values were measured")


class MachineHeartbeat(BaseModel):
    factory_id: str = Field(..., description = "Factory ID")
    production_line_id: str = Field(..., description = "Production Line ID")
    machine_id: str = Field(..., description = "Machine ID")
    vibration: float = Field(..., description = "Machine's vibration value")
    temperature: float = Field(..., description = "Machine's temperature value")


# Sentence to create the Time series collection

# db.createCollection("raw_sensor_data", {
#     timeseries: {
#         timeField: "timestamp",
#         metaField: "metadata",
#         granularity: "seconds"
#     }
# });


# Sentence to insert the time series record.

# db.raw_sensor_data.insertOne({
#     timestamp: new Date(),  // The current time
#     metadata: {
#         machine_id: "1",
#         factory_id: "qro_fact_1",
#         prod_line_id: "1"
#     },
#     temperature: 75.2,  // Example temperature data
#     vibration: 0.0023   // Example vibration data
# });