import paho.mqtt.client as mqtt

# MQTT broker configuration
BROKER_HOST = "localhost"
BROKER_PORT = 1883
KEEP_ALIVE = 60

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected successfully to MQTT Broker")
    else:
        print(f"Connection failed with code {rc}")

def on_disconnect(client, userdata, rc):
    print("Disconnected from MQTT Broker")

def create_mqtt_client():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.connect(BROKER_HOST, BROKER_PORT, KEEP_ALIVE)
    return client