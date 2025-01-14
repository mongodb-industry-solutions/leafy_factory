import "./styles.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startShopfloor, stopShopfloor, shopfloorFailure } from "../redux/slices/ShopFloorslice";
import axiosClient from "../config/axios";
import { Button } from "react-bootstrap";

const ShopfloorComponent = () => {
  const dispatch = useDispatch();

  const shopfloorState = useSelector((state) => state.ShopFloor);
  const { isRunning, error } = shopfloorState;

  console.log("ShopFloor State: ", shopfloorState);

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
    <div>
      <Button className="button-sim" onClick={toggleSimulation}>
        {isRunning ? "Stop Shopfloor Simulator" : "Start Shopfloor Simulator"}
      </Button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default ShopfloorComponent;
