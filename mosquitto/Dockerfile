# Use the official Cedalo MQTT image as base
FROM registry.cedalo.com/mosquitto/mosquitto:3.0

# Copy your custom configuration if needed
# For example, copy the configuration file if you have one
COPY ./config/mosquitto.conf /mosquitto/config/
COPY ./license/license.lic /mosquitto/license/

# Set the Cedalo license environment variable
ENV CEDALO_LICENSE_FILE=/mosquitto/license/license.lic

# Expose the default MQTT port (1883)
EXPOSE 1883