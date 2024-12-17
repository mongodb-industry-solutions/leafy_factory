from pydantic import BaseModel, Field
import datetime

class MachineHeartbeat(BaseModel):
    factory_id: str = Field(..., description = "Factory ID")
    production_line_id: str = Field(..., description = "Production Line ID")
    machine_id: str = Field(..., description = "Machine ID")
    vibration: float = Field(..., description = "Machine's vibration value, this is currently generated randomly on the Lambda Function")
    temperature: float = Field(..., description = "Machine's temperature value, this is currently generated randomly on the Lambda Function")
    timestamp: datetime.datetime = Field(default = None, description = "Timestamp of when the values were measured")

