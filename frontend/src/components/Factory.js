import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  useDispatch, // to MODIFY the Factory
  useSelector // to ACCESS the factory
} from "react-redux";
import axiosClient from "../config/axios";
import Table from "react-bootstrap/Table";
import { setAllOrders } from "../redux/slices/WorkOrderslice";

const Factory = () => {
  const dispatch = useDispatch(); // dispatch to MODIFY redux state
  const workOrders = useSelector(state => state.WorkOrders.workOrders);

  const [isLoading, setIsLoading] = useState(true);

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
        } finally {
          setIsLoading(false);
        }
      };

      fetchWorkOrders();
    },
    [dispatch]
  );

  return (
    <div>
      <h2>Work Orders</h2>

      {isLoading
        ? <p>Loading work orders...</p>
        : workOrders.length > 0
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
                </tr>
              </thead>
              <tbody>
                {workOrders.map(order =>
                  <tr key={order.id_work}>
                    <td>{order.id_work}</td>
                    <td>{order.wo_status}</td>
                    <td>{order.planned_start_date}</td>
                    <td>{order.planned_end_date}</td>
                    <td>{order.quantity}</td>
                    <td>{order.creation_date}</td>
                    <td>{order.product_id}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          : <p>No work orders available.</p>}
    </div>
  );
};

export default Factory;
