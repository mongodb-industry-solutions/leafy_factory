from pydantic import BaseModel


class SimulationRequest(BaseModel):
    machine_id: str
    heartbeat_url: str