from bson.json_util import dumps
from pymongo.collection import Collection
import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
from app.database import motor_kfk_work_orders_coll
import logging

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# List to track active WebSocket connections
stream_connections = []


async def send_work_order(message: str):
    """
    Send a message to all connected WebSocket clients for work orders.
    """
    
    for connection in stream_connections[:]:
        try:
            await connection.send_text(message)
        except Exception:
            # Remove disconnected WebSocket connections
            try:
                await remove_connection_workorders(connection)
            except Exception as e:
                logger.error(f"Error sending message to WebSocket: {e}")
                # Remove disconnected WebSocket connections
            try:
                await remove_connection_workorders(connection)
            except Exception as remove_error:
                logger.error(f"Error removing WebSocket connection: {remove_error}")


async def remove_connection_workorders(websocket: WebSocket):
    """
    Safely remove a WebSocket connection from the active connections list.
    """
    if websocket in stream_connections:
        stream_connections.remove(websocket)


@router.websocket("/ws/stream_workorders")
async def websocket_stream_workorders(websocket: WebSocket):
    """
    WebSocket endpoint to stream work order updates.
    """
    await websocket.accept()
    # Add the connection to the active connections list
    stream_connections.append(websocket)

    try:
        # Watch only inserts for the specified machine
        pipeline = [
            {
                "$match": 
                {
                    "operationType": {"$in": ["insert", "update"]}
                }
            }
        ]
        async with motor_kfk_work_orders_coll.watch(pipeline, full_document='updateLookup') as change_stream:
            async for change in change_stream:
                if websocket.client_state.name == "DISCONNECTED":  # Check if the WebSocket is still open
                    break
                document = change.get("fullDocument", {})
                if document:
                    await send_work_order(dumps(document))

    except WebSocketDisconnect:
        logger.info("WebSocket disconnected.")
    except Exception as e:
        logger.error(f"Unexpected WebSocket error: {e}")
    finally:
        await remove_connection_workorders(websocket)
        await websocket.close()