from pydantic import BaseModel


class SimulationRequest(BaseModel):
    factory_id: str
    production_line_id: str
    machine_id: str
    heartbeat_url: str