import React, { useEffect, useState } from "react";
import {
  useDispatch, // to MODIFY the Factory
  useSelector // to ACCESS the factory
} from "react-redux";
import axiosClient from "../config/axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { setAllOrders } from "../redux/slices/WorkOrderslice";

const WorkOrdersList = () => {
  const dispatch = useDispatch(); // dispatch to MODIFY redux state
  const workOrders = useSelector(state => state.WorkOrders.workOrders);

  const [activeTabs, setActiveTabs] = useState({});

  useEffect(
    () => {
      // load all work orders once this component gets rendered
      const fetchWorkOrders = async () => {
        try {
          //const response = await fetch('https://rickandmortyapi.com/api/character')
          const response = await axiosClient.get(
            "http://localhost:8000/workorders/"
          );
          console.log("-- getAllWorkOrders", response.data);
          const myWorkOrdersList = response.data;
          dispatch(setAllOrders([...myWorkOrdersList]));
        } catch (error) {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        }
      };

      fetchWorkOrders();
    },
    [dispatch]
  );

  function handleTabSelect(key) {
    setActiveTabs(key);
  }

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={activeTabs}
        onSelect={handleTabSelect}
        className="mb-3"
      >
        <Tab eventKey="workorders" title="Work Orders">
          <div>
            <h2>Work Orders</h2>
            {workOrders.map((order) => (
              <div key={order.id_work} className="work-order-details">
                <h4>Order ID: {order.id_work}</h4>
                <p>Status: {order.wo_status}</p>
              </div>
            ))}
          </div>
        </Tab>
        <Tab eventKey="jobs" title="Jobs">
          <div>
            <h3>Jobs Tab</h3>
          </div>
        </Tab>
        <Tab eventKey="shopfloor" title="Shopfloor Simulator" disabled>
          <div>
            <h3>Shopfloor Simulator Tab (Disabled)</h3>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default WorkOrdersList;