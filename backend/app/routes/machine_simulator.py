from fastapi import APIRouter, status, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from app.database import raw_sensor_data_coll, mariadb_conn
from app.models.machines import MachineHeartbeat, MachineValue
from datetime import datetime, timedelta, timezone
import time, random, threading, requests
from dotenv import load_dotenv
import os

# Load values from .env file
load_dotenv()

# Access the MongoDB_URI and MARIADB variables.
BACKEND_URL = os.getenv("BACKEND_URL")


router = APIRouter()


# Flag to control simulation
simulation_running = False
threads = []

# This can be modified to simulate the temperature threshold for the machines
# Normal and expected threshold for temperature
temp_status = ""
temperature_threshold = range(0, 81)
temperature_normal_values = (0, 81)

# High temperature
temperature_high_threshold = range(81, 111)
temperature_high_values = (81, 111)

# Excessive
temperature_excessive_threshold = range(111, 10000)
temperature_excessive_values = (111, 10000)

# This can be modified to simulate the vibration threshold for the machines
# Normal and expected threshold for vibration
vibration_status = ""
vibration_threshold = range(0, 7)
vibration_normal_values = (0, 7)

# High vibration
vibration_high_threshold = range(7, 11)
vibration_high_values = (0, 7)

# Excessive vibration
vibration_excessive_threshold = range(11, 10000)
vibration_excessive_values = (11, 10000)



def send_heartbeat(data: MachineHeartbeat):
    while simulation_running:
        # Conditionals to set machine's temperature
        if data["temperature"] in temperature_threshold:
            temp_value = random.uniform(*temperature_normal_values)
            temp_status = "Normal"
        elif data["temperature"] in temperature_high_threshold:
            temp_value = random.uniform(*temperature_high_values)
            temp_status = "High"
        else:
            temp_value = random.uniform(*temperature_excessive_values)
            temp_status = "Excessive"

        
        # Conditionals to set machine's vibration
        if data["vibration"] in vibration_threshold:
            vibr_value = random.uniform(*vibration_normal_values)
            vibration_status = "Normal"
        elif data["vibration"] in vibration_high_threshold:
            vibr_value = random.uniform(*vibration_high_values)
            vibration_status = "High"
        else:
            vibr_value = random.uniform(*vibration_excessive_values)
            vibration_status = "Excessive"
        
        try: 
            # The variable "data" receives the data sent from machine
            heartbeat_record = {
                "timestamp": datetime.now(timezone.utc),
                "metadata": {
                    "factory_id": data["factory_id"],
                    "prod_line_id": data["production_line_id"],
                    "machine_id": data["machine_id"]
                },
                "vibration": round(vibr_value,2),
                "temperature": round(temp_value,2),
                "temperature_status": temp_status,
                "vibration_status": vibration_status
            }

            insert_heartbeat_result = raw_sensor_data_coll.insert_one(heartbeat_record)

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
    global simulation_running, threads
    simulation_running = True
    threads = []
    factory_id = "qro_fact_1"
    production_line_id = ""

    
    # This means that we want to iterate the range from 1 inclusive to 4 inclusive
    machine_ids= range(1,5)

    # This updates the value of the machines wherever which is the last value.
    # Whenever we start the simulator we want to have normal values.
    update_get_temp_vib = f"""
                            UPDATE machines
                            SET temp_values = {temperature_normal_values[0]}, vib_values = {vibration_normal_values[0]}
                            WHERE id_machine in {tuple(machine_ids)}
                         """
    
    try:
    
        with mariadb_conn.cursor() as db_cur:
            # temperature_threshold[0] = 70 / Normal and expetected threshold for temperature
            # vibration_threshold[0] = 3 / Normal and expetected threshold for vibration
            db_cur.execute(update_get_temp_vib)
            
            # Commit the update operations.
            mariadb_conn.commit()

        for machine_id in machine_ids:

            if machine_id == 1 or machine_id == 2:
                production_line_id = 1
            else:
                production_line_id = 2

            machine_data = {
                "factory_id" : factory_id,
                "production_line_id": production_line_id,
                "machine_id" : machine_id,
                "vibration": vibration_normal_values[0],
                "temperature": temperature_normal_values[0],
            }

            t = threading.Thread(target=send_heartbeat, args=(machine_data,))
            threads.append(t)
            t.start()
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start the simulation: {str(e)}")

@router.post("/start-simulation")
async def start_simulation_machines(background_tasks: BackgroundTasks):
    # This API starts the simulation of the machines.

    global simulation_running
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
    


# Define the function to stop and restart the simulation
def stop_and_restart_simulation(machine_ids, factory_id, data):
    global simulation_running, threads
    
    backend_update_job_url = f"{BACKEND_URL}/stop-simulation"
    response = requests.post(backend_update_job_url)

    if response.status_code == 200:
        print("API called successfully to stop the current simulation")
        time.sleep(2)

        # Clear existing threads
        simulation_running = False
        threads.clear()

        for machine_id in machine_ids:
            production_line_id = 1 if machine_id in [1, 2] else 2
            
            if machine_id == int(data.machine_id):
                new_vibration = data.vibration
                new_temperature = data.temperature
            else:
                new_vibration = vibration_normal_values[0]
                new_temperature = temperature_normal_values[0]

            machine_data = {
                "factory_id": factory_id,
                "production_line_id": production_line_id,
                "machine_id": machine_id,
                "vibration": new_vibration,
                "temperature": new_temperature,
            }

            simulation_running = True

            t = threading.Thread(target=send_heartbeat, args=(machine_data,))
            threads.append(t)
            t.start()

        print("Simulation restarted with the new temperature and vibration values successfully.")
    else:
        print(f"Failed to call API: {response.status_code}, {response.text}")
        raise HTTPException(status_code=500, detail=f"Failed to stop current simulation: {response.text}")



@router.put("/change_values")
async def update_thresholds(data: MachineValue, background_tasks: BackgroundTasks):
    global simulation_running, threads

    print(f"Data: {data}")

    # Updates the thresholds in case we want to introduce abnormal values.
    temperature_value = data.temperature
    vibration_value = data.vibration
    factory_id = "qro_fact_1"

    # This means that we want to iterate the range from 1 inclusive to 4 inclusive
    machine_ids = range(1, 5)

    update_threshold_values = """
                                UPDATE machines
                                SET temp_values = %s, vib_values = %s
                                WHERE id_machine = %s
                            """
    
    try:
        with mariadb_conn.cursor() as db_cur:
            # Updating temperature and vibration values
            db_cur.execute(update_threshold_values, (temperature_value, vibration_value, data.machine_id))
            # Commit the update operation
            mariadb_conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to set the new temperature and vibration values: {str(e)}")
    
    # Add the task to stop and restart the simulation as a background task
    background_tasks.add_task(stop_and_restart_simulation, machine_ids, factory_id, data)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Thresholds updated successfully. Simulation will restart in the background."}
    )