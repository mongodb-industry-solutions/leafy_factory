import "./styles.css";
import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { startShopfloor, stopShopfloor, shopfloorFailure } from "../redux/slices/ShopFloorslice";
import axiosClient from "../config/axios";
import { Button, Row, Col, Card, ListGroup } from "react-bootstrap";
import ProdLineImag from '../images/ProdLine.png'

function ShopfloorComponent() {
    const dispatch = useDispatch();
    const shopfloorState = useSelector((state) => state.ShopFloor);
    const { isRunning, error } = shopfloorState;
    const [prodLine1, setProdLine1] = useState([]);
    const [prodLine2, setProdLine2] = useState([]);

    useEffect(() => {

        const fetchMachineDetails = async () => {
            try {
                const response = await axiosClient.get("/machines/machine_details");
                console.log("Fetched Machine Details: ", response.data.result);

                const prodLine1 = response.data.result.filter(machines => machines.production_line_id === 1);
                const prodLine2 = response.data.result.filter(machines => machines.production_line_id === 2);
                setProdLine1(prodLine1);
                setProdLine2(prodLine2);
            } catch (error) {
                console.error("Error fetching machine details:", error);
            }
        };
        fetchMachineDetails();
    }, []);

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
                <Col md={3} className="prod-card">
                <Card className="prod-card">
                    <Card.Img className="prod-line-img" variant="top" src={ProdLineImag} alt="Production Line 1" />
                    <Card.Body className="card-body">
                    <Card.Title>Production Line 1 Detailed</Card.Title>
                        <ListGroup variant="flush">
                        {prodLine1.map(machines => (
                        <ListGroup.Item key={machines.id_machine}>
                        <strong>ID:</strong> {machines.id_machine}, <strong>Status:</strong> {machines.machine_status}, <strong>Operator:</strong> {machines.operator}
                        </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
                </Col>

                <Col md={3} className="prod-card">
                    <Card className="prod-card">
                        <Card.Img className="prod-line-img" variant="top" src={ProdLineImag} alt="Production Line 2" />
                        <Card.Body className="card-body">
                        <Card.Title>Production Line 2 Detailed</Card.Title>
                        <ListGroup variant="flush">
                        {prodLine2.map(machines => (
                        <ListGroup.Item key={machines.id_machine}>
                        <strong>ID:</strong> {machines.id_machine}, <strong>Status:</strong> {machines.machine_status}, <strong>Operator:</strong> {machines.operator}
                        </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ShopfloorComponent;

