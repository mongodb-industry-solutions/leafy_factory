import "./styles.css";
import React, { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { startShopfloor, stopShopfloor, shopfloorFailure } from "../redux/slices/ShopFloorslice";
import axiosClient from "../config/axios";
import { Button, Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";
//import ProgressBar from "react-bootstrap";
import ProdLineImag from '../images/ProdLine.png';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom'

function ShopfloorComponent() {
    const dispatch = useDispatch();
    const shopfloorState = useSelector((state) => state.ShopFloor);
    const { isRunning, error } = shopfloorState;
    const [machines, setMachines] = useState([]);
    //const [prodLine1, setProdLine1] = useState([]);
    //const [prodLine2, setProdLine2] = useState([]);
    const chartDiv = useRef(null);
    const chartRef = useRef(null);
    //const progressLevel = 60

    useEffect(() => {

        const fetchMachineDetails = async () => {
            try {
                const response = await axiosClient.get("/machines/machine_details");
                console.log("Fetched Machine Details: ", response.data.result);
                setMachines(response.data.result);
            } catch (error) {
                console.error("Error fetching machine details:", error);
            }
        };
        fetchMachineDetails();


        // MongoDB Chart declaration and refresh of data per minute
        const sdk = new ChartsEmbedSDK({
            baseUrl: "https://charts.mongodb.com/charts-jeffn-zsdtj"
        });
        const chart = sdk.createChart({
            chartId: "4f846f1e-0268-473c-b00b-90b4ccf4cb2e"
            });
        chartRef.current = chart; (async () => {
            try {
            await chart.render(chartDiv.current);
            console.log("Chart info returned");
            } catch (error) {
            console.error("Error rendering the chart:", error);
            }
        })();

        const interval = setInterval(() => {
            if (chartRef.current) {
              chartRef.current.refresh();
              console.log("Chart refreshed automatically");
            }
          }, 60000);
          return () => clearInterval(interval);
        }, []);
        
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


    return (
        <div className="shopfloor-container">
            <Button className="button-sim" onClick={toggleSimulation}>
                {isRunning ? "Stop Shopfloor Simulator" : "Start Shopfloor Simulator"}
            </Button>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <Row>
                {machines.map(machine => (
                <Col md={3} key={machine.id_machine} className="prod-card">
                    <Card className="prod-card">
                    <Card.Img className="prod-line-img" variant="top" src={ProdLineImag} alt={`Production Line for Machine ${machine.id_machine}`} />
                    <Card.Body className="card-body">
                        <ListGroup variant="flush">
                        <ListGroup.Item>{machine.machine_status === "Available" ? (
                            <Button variant="success" disabled>
                                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                Machine {machine.id_machine}: Available
                            </Button>
                            ) : machine.machine_status === "Running" ? (
                            <Button variant="warning" disabled>
                                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                Machine {machine.id_machine}: Running
                            </Button>
                            ) : (
                            <Button variant="secondary" disabled>
                                Machine {machine.id_machine}: {machine.machine_status}
                            </Button>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item><strong>Operator:</strong> {machine.operator}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>

            {/*<Card className="prod-card">
                <ProgressBar now={progressLevel} label={`${progressLevel}%`} animated />
            </Card>*/}

            <Button onClick={refreshChart} className="button-chart">Refresh Chart</Button>
            <div className="chart">
                <div ref={chartDiv} style={{ width: "100%", height: "100%" }}></div>
            </div>

        </div>
    );
} 


export default ShopfloorComponent;