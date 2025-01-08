//Factory.js
import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  useDispatch, // to MODIFY the Factory
  useSelector // to ACCESS the factory
} from "react-redux";
import axiosClient from "../config/axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { setAllOrders } from "../redux/slices/WorkOrderslice";

const Factory = () => {
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
          const factory = response.data;
          dispatch(setAllOrders([...factory]));
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
            {workOrders.length > 0
              ? <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Planned Start Date</th>
                      <th>Planned End Date</th>
                      <th>Quantity</th>
                      <th>Creation Date</th>
                      <th>Product ID</th>
                      {/*<th>Cost</th>
                    <th>Materials Used</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    {workOrders.map(order =>
                      <tr key={order.id_work}>
                        <td>
                          {order.id_work}
                        </td>
                        <td>
                          {order.wo_status}
                        </td>
                        <td>
                          {order.planned_start_date}
                        </td>
                        <td>
                          {order.planned_end_date}
                        </td>
                        <td>
                          {order.quantity}
                        </td>
                        <td>
                          {order.creation_date}
                        </td>
                        <td>
                          {order.product_id}
                        </td>
                        {/*<td>{order.cost}</td>
                      <td>{order.materials_used}</td>*/}
                      </tr>
                    )}
                  </tbody>
                </Table>
              : <p>No work orders available.</p>}
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
        <Tab eventKey="overview" title="Demo Overview">
          <div>
            <h3>Demo Architecture Overview</h3>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Factory;
