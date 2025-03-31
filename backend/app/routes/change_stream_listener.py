from bson.json_util import dumps
from pymongo.collection import Collection
import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
from app.database import motor_raw_sensor_data_coll

router = APIRouter()

# Dictionary to track active WebSocket connections by machine_id
active_connections = {}

async def send_message_to_machine(machine_id: int, message: str):
    """
    Send a message to all WebSocket clients connected to a specific machine_id.
    """
    if machine_id in active_connections:
        for connection in active_connections[machine_id]:
            try:
                await connection.send_text(message)
            except Exception:
                # Remove disconnected WebSocket connections
                await remove_connection(machine_id, connection)


async def remove_connection(machine_id: int, websocket: WebSocket):
    """
    Remove a WebSocket connection from the active connections list.
    """
    if machine_id in active_connections:
        active_connections[machine_id].remove(websocket)
        if not active_connections[machine_id]:  # Remove the machine_id if no connections are left
            del active_connections[machine_id]


@router.websocket("/ws/stream_sensor/{machine_id}")
async def websocket_stream_sensor_data(websocket: WebSocket, machine_id: int):
    """
    WebSocket endpoint to stream sensor data for a specific machine.
    """
    await websocket.accept()
    # Add the connection to the active connections list
    if machine_id not in active_connections:
        active_connections[machine_id] = []
    active_connections[machine_id].append(websocket)

    try:
        # Watch only inserts for the specified machine
        pipeline = [
            {
                "$match": 
                {
                    "operationType": "insert",
                    "fullDocument.metadata.machine_id": machine_id
                }
            }
        ]
        async with motor_raw_sensor_data_coll.watch(pipeline) as change_stream:
            async for change in change_stream:
                # Serialize the data to JSON
                document = change.get("fullDocument", {})
                if document:
                    await send_message_to_machine(machine_id, dumps(document))
                # Send the data to the relevant WebSocket clients

    except WebSocketDisconnect:
        print(f"WebSocket disconnected for machine {machine_id}")
        await remove_connection(machine_id, websocket)
    except Exception as e:
        print(f"Error: {e}")
        await websocket.close(code=1011)  # Internal error