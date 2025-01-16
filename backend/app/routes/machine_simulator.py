from fastapi import APIRouter, status, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from app.database import raw_sensor_data_coll
from app.models.machines import MachineHeartbeat, MachineStatus, MachineDetails
from datetime import datetime, timedelta, timezone
import time, random, threading


router = APIRouter()


# Flag to control simulation
simulation_running = False
threads = []

# This can be modified to simulate the temperature threshold for the machines
temperature_threshold = (70, 80)

# This can be modified to simulate the vibration threshold for the machines
vibration_threshold = (10, 50)


def send_heartbeat(data: MachineHeartbeat):
    while simulation_running:
        temp_value = random.uniform(*temperature_threshold)
        vibr_value = random.uniform(*vibration_threshold)
        
        try: 
            # The variable "data" receives the data sent from machine
            heartbeat_record = {
                "timestamp": datetime.now(timezone.utc),
                "metadata": {
                    "factory_id": data["factory_id"],
                    "prod_line_id": data["production_line_id"],
                    "machine_id": data["machine_id"]
                },
                "vibration": vibr_value,
                "temperature": temp_value
            }

            insert_heartbeat_result = raw_sensor_data_coll.insert_one(heartbeat_record)
            print(f"Inserted ID: {insert_heartbeat_result.inserted_id}")

            # Simulate different intervals, in this case we want to send the heartbeat every 2 seconds
            time.sleep(2)

            # return JSONResponse(
            #     status_code=status.HTTP_201_CREATED,
            #     content={"inserted id ": str(insert_heartbeat_result.inserted_id)}
            # )

        except Exception as e:
            # raise HTTPException(status_code=500, detail=f"Failed to save heartbeat: {str(e)}")
            print(e)


def start_simulation():
    print("Running")
    global simulation_running, threads
    simulation_running = True
    threads = []
    factory_id = "qro_fact_1"
    production_line_id = ""

    print("Running")

    # Simulates that we run 4 machines
    
    for machine_id in range(1,5):
        if machine_id == 1 or machine_id == 2:
            production_line_id = 1
        else:
            production_line_id = 2

        machine_data = {
            "factory_id" : factory_id,
            "production_line_id": production_line_id,
            "machine_id" : machine_id
        }

        t = threading.Thread(target=send_heartbeat, args=(machine_data,))
        threads.append(t)
        t.start()


@router.post("/start-simulation")
async def start_simulation_machines(background_tasks: BackgroundTasks):
    # This API starts the simulation of the machines.

    global simulation_running
    print(f"Global simulation: {simulation_running}")
    try:
        if simulation_running:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Simulation is already running"}
            )
        
        background_tasks.add_task(start_simulation)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "Simulation started successfully"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start the simulation: {str(e)}")


@router.post("/stop-simulation")
async def stop_simulation():
    # This API ends the simulation of the machines
    global simulation_running, threads
    try:
        if not simulation_running:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"message": "Simulation is not running"}
            )
        simulation_running = False

        for t in threads:
            t.join()
        
        threads = []

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "Simulation stopped successfully"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to stop the simulation: {str(e)}")
    
@router.post("/update-thresholds")
async def update_thresholds(temperature_range: tuple = None, vibration_range: tuple = None):
    # Updates the threholds in case we can to introduce abnormal values.
    temperature_threshold = temperature_range
    vibration_threshold = vibration_range

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Thresholds updated successfully"}
    )