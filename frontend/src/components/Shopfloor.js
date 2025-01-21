import "./styles.css";
import React, { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { startShopfloor, stopShopfloor, shopfloorFailure } from "../redux/slices/ShopFloorslice";
import axiosClient from "../config/axios";
import { Form, Button, Row, Col, Card, ListGroup, Spinner, Alert } from "react-bootstrap";
import ProdLineImag from '../images/ProdLine.png';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom'

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
            console.error("Error fetching machine details:", error);
        }
        };

    const fetchFactoryDetails = async () => {
        try {
            const response = await axiosClient.get("/machines/factory_details");
            console.log("Fetched Factory Details: ", response.data);
            setFactoryDetails(response.data);  // Update state with fetched factory data
        } catch (error) {
            console.error("Error fetching factory details:", error);
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
        <Button className="button-sim" onClick={toggleSimulation}>
            {isRunning ? "Stop Shopfloor Simulator" : "Start Shopfloor Simulator"}
        </Button>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

        <Form onSubmit={handleFormSubmit} className="form-wrapper" style={{ maxWidth: "500px", margin: "20px auto", textAlign: "center"}}>
        <h2>Change machine values</h2>
            <Alert variant={getTemperature(temperature)}>New Temperature: {temperature}°C</Alert>
            <Alert variant={getVibration(vibration)}>New Vibration: {vibration} mm/s</Alert>

            <Form.Group controlId="machine_id">
            <Form.Label>Select Machine ID</Form.Label>
            <Form.Control type="string" as="select" value={idMachine} onChange={(e) => setIdMachine(String(e.target.value))} style={{ textAlign: "center" }} required>
            <option value="">Please enter desired value</option>
                {["1", "2", "3", "4"].map(id => (
            <option key={id} value={id}>{id}</option>
                ))}
            </Form.Control>
            </Form.Group>

            <Form.Group className="form-temperature" controlId="temperature">
            <Form.Label>Temperature (°C)</Form.Label>
            <Form.Control as="select" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} style={{ textAlign: "center" }} required>
                <option value="">Please enter desired value</option> 
                {Array.from({ length: 61 }, (_, i) => i + 70).map(temp => (
                <option key={temp} value={temp}>{temp}</option>
                ))}
            </Form.Control>
            </Form.Group>

            <Form.Group className="form-vibration" controlId="vibration">
            <Form.Label>Vibration (mm/s)</Form.Label>
            <Form.Control type="number" step="0.1" min={3.8} value={vibration} onChange={(e) => setVibration(Number(e.target.value))} style={{ textAlign: "center" }} required/>
            </Form.Group>

            <Button className="button" type="submit"   disabled={!idMachine || idMachine === "Please enter desired value" || !temperature || temperature === "Please enter desired value" || !vibration} style={{ width: "100%" }}>
            Update Machine Values
            </Button>
        </Form>

        <Row>
            {machines.map(machine => (
            <React.Fragment key={machine.id_machine}>
                <Col md={3} key={machine.id_machine} className="prod-card">
                    <Card className="prod-card">
                    <Card.Img className="prod-line-img" variant="top" src={ProdLineImag} alt={`Machine ${machine.id_machine}`} />
                    <Card.Body className="card-body">
                    <Card.Title className="text-center">Machine : {machine.id_machine}</Card.Title>
                        <ListGroup variant="flush">
                        <ListGroup.Item>{machine.machine_status === "Available" ? (
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
                        <ListGroup.Item><strong>Production Line:</strong> {machine.production_line_id}</ListGroup.Item>
                        <ListGroup.Item><strong>Avg Temperature:</strong> {Number(machine.avg_temperature).toFixed(1)} °C</ListGroup.Item>
                        <ListGroup.Item><strong>Avg Vibration:</strong> {Number(machine.avg_vibration).toFixed(2)} mm/s</ListGroup.Item>
                        <ListGroup.Item><strong>Last Maintenance:</strong> {machine.last_maintenance}</ListGroup.Item>
                        <ListGroup.Item><strong>Operator:</strong> {machine.operator}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    </Card>
                </Col>

                        <Col md={3} className="prod-card">
                            <Card className="prod-card">
                                <Card.Body className="card-body">
                                    <Card.Title className="text-center">Machine JSON Data</Card.Title>
                                    <Card.Text>
                                        <pre>{JSON.stringify(machine, null, 2)}</pre>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

            </React.Fragment>
                ))}
        </Row>

        <Button onClick={refreshChart} className="button-chart">Refresh Chart</Button>
        <div className="chart">
            <div ref={chartDiv} style={{ width: "100%", height: "100%" }}></div>
        </div>

        </div>
    );
} 

export default ShopfloorComponent;