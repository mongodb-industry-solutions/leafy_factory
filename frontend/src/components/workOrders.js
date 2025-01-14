import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  useDispatch, // to MODIFY the Factory
  useSelector // to ACCESS the factory
} from "react-redux";
import axiosClient from "../config/axios";
import { Table, Row, Col } from "react-bootstrap";
import { setAllOrders } from "../redux/slices/WorkOrderslice";
import CreateForm from "./CreateForm";

const WorkOrders = () => {
  const dispatch = useDispatch(); // dispatch to MODIFY redux state
  const workOrders = useSelector(state => state.WorkOrders.workOrders);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      // load all work orders once this component gets rendered
      const fetchWorkOrders = async () => {
        try {
          //const response = await fetch('https://rickandmortyapi.com/api/character')
          //const response = await axiosClient.get("http://localhost:8000/workorders/");
          const response = await axiosClient.get("http://ec2-3-91-158-15.compute-1.amazonaws.com:8000/workorders/")
          console.log("-- getAllWorkOrders", response.data);
          const workOrders = response.data;
          dispatch(setAllOrders([...workOrders]));
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
    <div className="container-fluid">
      <h2 className="history-header">Work Orders History</h2>

      <Row className="align-items-start mx-0">
        <Col lg={5} md={6} sm={12} className="form-wrapper px-2">
          <h4>Create a New Work Order</h4>
          <CreateForm />
        </Col>

        <Col lg={7} md={6} sm={12} className="table-wrapper">
          {isLoading
            ? <p>Loading work orders...</p>
            : workOrders.length > 0
              ? <Table striped bordered hover responsive className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Creation Date</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Planned Start Date</th>
                      <th>Planned End Date</th>
                      {/*<th>Product ID</th>*/}
                      {/*<th>Planned Cost</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    {workOrders.map(order =>
                    <tr key={order.id_work}>
                      <td>{order.id_work}</td>
                      <td>{order.wo_status}</td>
                      <td>{order.creation_date}</td>
                      <td>{order.product_name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.planned_start_date}</td>
                      <td>{order.planned_end_date}</td>
                      {/*<td>{order.product_id}</td>*/}
                      {/*<td>{order.planned_cost}</td>*/}
                    </tr>
                    )}
                  </tbody>
                </Table>
              : <p>No work orders available.</p>}
        </Col>
      </Row>
    </div>
  );
};

export default WorkOrders;
