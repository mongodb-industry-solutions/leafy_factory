"use client";

import "../styles.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startShopfloor, stopShopfloor, shopfloorFailure } from "../../redux/slices/ShopFloorslice";
import axiosClient from "../../lib/axios.js";
import { Form, Row, Col, Card, ListGroup, Spinner, Alert } from "react-bootstrap";
import Image from "next/image";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom'
import Button from "@leafygreen-ui/button";
import styles from "./simulation.module.css";
import Icon from "@leafygreen-ui/icon";
import IconButton from "@leafygreen-ui/icon-button";
import { H2, H3, Body } from "@leafygreen-ui/typography";


function ShopfloorComponent() {
  const dispatch = useDispatch();
  const shopfloorState = useSelector((state) => state.ShopFloor);
  const { isRunning, error } = shopfloorState;
  const [machines, setMachines] = useState([]);
  const [factoryDetails, setFactoryDetails] = useState([]);
  const chartDiv = useRef(null);
  const chartRef = useRef(null);
  const [idMachine, setIdMachine] = useState("");
  const [temperature, setTemperature] = useState();
  const [vibration, setVibration] = useState(3.8);


  const fetchMachineDetails = async () => {
    try {
      const response = await axiosClient.get("/machines/machine_details");
      console.log("Fetched Machine Details: ", response.data.result);
      setMachines(response.data.result);
    } catch (error) {
      console.log("Error fetching machine details:", error);
    }
  };

  const fetchFactoryDetails = async () => {
    try {
      const response = await axiosClient.get("/machines/factory_details");
      console.log("Fetched Factory Details: ", response.data);
      setFactoryDetails(response.data);
    } catch (error) {
      console.log("Error fetching factory details:", error);
    }
  };

  useEffect(() => {
    fetchMachineDetails();
    fetchFactoryDetails();
    // MongoDB Chart declaration and refresh of data per minute
    const sdk = new ChartsEmbedSDK({
      baseUrl: "https://charts.mongodb.com/charts-jeffn-zsdtj"
    });
    const chart = sdk.createChart({
      chartId: "4f846f1e-0268-473c-b00b-90b4ccf4cb2e"
    });
    chartRef.current = chart;
    (async () => {
      try {
        await chart.render(chartDiv.current);
        console.log("Chart info returned");
      } catch (error) {
        console.error("Error rendering the chart:", error);
      }
    })();

    //Refresh for automatically chart return
    const interval = setInterval(() => {
      if (chartRef.current) {
        chartRef.current.refresh();
        console.log("Chart refreshed automatically");
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  //Refresh for machine details return
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMachineDetails();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMachineDetails();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  //Refresh for manually chart return
  const refreshChart = () => {
    if (chartRef.current) {
      chartRef.current.refresh();
      console.log("Update (manual) for chart refresh received");
    }
  };

  //Simulation enablement
  const toggleSimulation = async () => {
    if (isRunning) {
      await stopSimulation();
    } else {
      await startSimulation();
    }
  };

  const startSimulation = async () => {
    try {
      const response = await axiosClient.post("/start-simulation");
      console.log(response.data.message);
      dispatch(startShopfloor());
    } catch (error) {
      dispatch(shopfloorFailure(error.response?.data?.detail || "Failed to start the simulation"));
    }
  };
  const stopSimulation = async () => {
    try {
      const response = await axiosClient.post("/stop-simulation");
      console.log(response.data.message);
      dispatch(stopShopfloor());
    } catch (error) {
      dispatch(shopfloorFailure(error.response?.data?.detail || "Failed to stop the simulation"));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosClient.put("/change_values", { machine_id: idMachine, temperature, vibration });
      console.log("Updated machine values: ", response.data);
    } catch (error) {
      console.error("Error updating machine values:", error);
    }
  };

  const getTemperature = (temperature) => {
    if (temperature <= 80) return "success";
    if (temperature <= 110) return "warning";
    return "danger";
  };

  const getVibration = (vibration) => {
    if (vibration <= 6.3) return "success";
    if (vibration <= 10) return "warning";
    return "danger";
  };

  return (
    <div className="shopfloor-container">

      <div className={styles.buttonWrapper}>
        <Button variant={isRunning ? "danger" : "baseGreen"} onClick={toggleSimulation}>
          {isRunning ? "Stop Shopfloor Simulator" : "Start Shopfloor Simulator"}
        </Button>

      </div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}


      <Form onSubmit={handleFormSubmit} className={styles.formWrapper}>
        <H3 className={styles.H3}>Change Thresholds</H3>
        <div className={styles.alerts}>
          <Alert variant={getTemperature(temperature)}>New Temperature: {temperature}°C</Alert>
          <Alert variant={getVibration(vibration)}>New Vibration: {vibration} mm/s</Alert>
        </div>

        <div className={styles.formFields}>

          <Form.Group className={styles.formGroup} controlId="machine_id">
            <Form.Label>Select Machine ID</Form.Label>
            <Form.Control type="string" as="select" value={idMachine} onChange={(e) => setIdMachine(String(e.target.value))} required>
              <option value="">Please enter desired value</option>
              {["1", "2", "3", "4"].map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className={styles.formGroup} controlId="temperature">
            <Form.Label>Temperature (°C)</Form.Label>
            <Form.Control as="select" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} required>
              <option value="">Please enter desired value</option>
              {Array.from({ length: 61 }, (_, i) => i + 70).map(temp => (
                <option key={temp} value={temp}>{temp}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className={styles.formGroup} controlId="vibration">
            <Form.Label>Vibration (mm/s)</Form.Label>
            <Form.Control type="number" step="0.1" min={3.8} value={vibration} onChange={(e) => setVibration(Number(e.target.value))} required />
          </Form.Group>

        </div>

        <Button type="submit" disabled={!idMachine || idMachine === "Please enter desired value" || !temperature || temperature === "Please enter desired value" || !vibration} variant="primary">
          Update Machine Values
        </Button>
      </Form>

      <Row>
        {machines.map(machine => (
          <React.Fragment key={machine.id_machine}>
            <Col md={3} className={styles.prodCards}>
              <Card className={styles.card}>
                <Card.Img className={styles.cardImg} variant="top"
                  src="/ProdLine.png" alt={`Machine ${machine.id_machine}`} />
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>Machine : {machine.id_machine}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item className={styles.statusContainer}>
                      <div
                        className={`${styles.statusLabel} ${machine.machine_status === "Available"
                            ? styles.available
                            : machine.machine_status === "Running"
                              ? styles.running
                              : styles.danger
                          }`}
                      >
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                        {machine.machine_status === "Available"
                          ? `Status ${machine.id_machine}: Available`
                          : machine.machine_status === "Running"
                            ? `Machine ${machine.id_machine}: Running`
                            : `Machine ${machine.id_machine}: ${machine.machine_status}`}
                      </div>
                    </ListGroup.Item>


                    {/*
                    <ListGroup.Item>
                      {machine.machine_status === "Available" ? (
                        <Button variant="success" disabled>
                          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                          Status {machine.id_machine}: Available
                        </Button>
                      ) : machine.machine_status === "Running" ? (
                        <Button variant="warning" disabled>
                          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                          Machine {machine.id_machine}: Running
                        </Button>
                      ) : (
                        <Button variant="danger" disabled>
                          Machine {machine.id_machine}: {machine.machine_status}
                        </Button>
                      )}
                    </ListGroup.Item>
                    */}

                    <ListGroup.Item className={styles.cardItem}><strong>Production Line:</strong> {machine.production_line_id}</ListGroup.Item>
                    <ListGroup.Item className={styles.cardItem}><strong>Avg Temperature:</strong> {Number(machine.avg_temperature).toFixed(1)} °C</ListGroup.Item>
                    <ListGroup.Item className={styles.cardItem}><strong>Avg Vibration:</strong> {Number(machine.avg_vibration).toFixed(2)} mm/s</ListGroup.Item>
                    <ListGroup.Item className={styles.cardItem}><strong>Last Maintenance:</strong> {machine.last_maintenance}</ListGroup.Item>
                    <ListGroup.Item className={styles.cardItem}><strong>Operator:</strong> {machine.operator}</ListGroup.Item>
                  </ListGroup>

                  {/* Tooltip icon to show Machine JSON Data inside {} */}
                  {/* <div className={styles.tooltipWrapper}>
                    <IconButton className={styles.tooltipIcon}>
                      <Icon glyph="CurlyBraces" aria-label="Curly Braces" />
                    </IconButton>

                    <div className={styles.tooltipContent}>
                      <pre>{JSON.stringify(machine, null, 2)}</pre>
                    </div>
                  </div> */}

                </Card.Body>
              </Card>
            </Col>

            {/** CARDS WITH MACHINE DATA
            <Col md={3} className="prod-card">
              <Card className="prod-card">
                <Card.Body className="card-body">
                  <Card.Title className="text-center">Machine JSON Data</Card.Title>
                  <div className="card-body">
                    <pre>{JSON.stringify(machine, null, 2)}</pre>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            */}
          </React.Fragment>
        ))}
      </Row>

      <div className={styles.buttonWrapper}>
        <Button onClick={refreshChart} variant="primary">Refresh Chart</Button>
      </div>

      <div className="chart">
        <div ref={chartDiv} style={{ width: "100%", height: "100%" }}></div>
      </div>
    </div>
  );
}

export default ShopfloorComponent;