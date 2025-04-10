"use client";

import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import axiosClient from "../../lib/axios";
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/slices/WorkOrderslice";
import Button from "@leafygreen-ui/button";
import styles from "./createform.module.css";


const CreateForm = ({onSubmitSuccess}) => {

  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [creationDate] = useState(new Date().toISOString());
  const [plannedStartDate, setPlannedStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString();
  });
  const [plannedEndDate, setPlannedEndDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const addWorkOrder = {
      planned_start_date: plannedStartDate,
      planned_end_date: plannedEndDate,
      quantity: quantity,
      status: "Created",
      creation_date: creationDate,
      product_cat_id: product === "Cogwheel" ? 1 : product === "Gear housing" ? 2 : 0
    };

    try {
      //const response = await axios.post("http://localhost:8000/workorders/", addWorkOrder);
      const response = await axiosClient.post("/workorders", addWorkOrder);
      console.log("Work order created successfully", response.data);
      dispatch(addOrder(response.data));

      //Retrieves the new work Order into the table
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {  
      console.error("There was an error creating the work order:", error);  
    }  
  }; 

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setProduct(selectedProduct);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="work_id">
          <Form.Label>Work Order ID</Form.Label>
          <Form.Control type="number" value="" readOnly placeholder="ID shown once created" className={styles.formControl} />
        </Form.Group>

        <Form.Group as={Col} controlId="product_select">
          <Form.Label>Product</Form.Label>
          <Form.Select value={product} onChange={handleProductChange} required>
            <option value="">Please select a product</option>
            <option value="Cogwheel">Cogwheel</option>
            <option value="Gear housing">Gear housing</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
    {/* <Form.Group as={Col} controlId="wo_status">
          <Form.Label>Work Order Status</Form.Label>
          <Form.Control type="text" value="Created" readOnly className={styles.formControl} />
        </Form.Group> */}

        <Form.Group as={Col} controlId="form_quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required>
            {[...Array(30).keys()].map((number) => (
              <option key={number + 1} value={number + 1}>
                {number + 1}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="creation_date" style={{ display: "none" }}>
          <Form.Label>Creation Date</Form.Label>
          <Form.Control type="text" value={creationDate} readOnly className={styles.formControl} />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="planned_start_date">
          <Form.Label>Planned Start Date</Form.Label>
          <Form.Control
            type="date"
            value={plannedStartDate.split("T")[0]}
            min={new Date(new Date().setDate(new Date().getDate() + 2))
              .toISOString()
              .split("T")[0]}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const minDate = new Date();
              minDate.setDate(minDate.getDate() + 2);

              if (selectedDate >= minDate) {
                setPlannedStartDate(selectedDate.toISOString());
                setPlannedEndDate(""); 
              }
            }}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="planned_end_date">
          <Form.Label>Planned End Date</Form.Label>
          <Form.Control
            type="date"
            value={plannedEndDate.split("T")[0]}
            min={
              plannedStartDate
                ? new Date(new Date(plannedStartDate).setDate(new Date(plannedStartDate).getDate() + 10))
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            onChange={(e) => {
              if (!plannedStartDate) {
                alert("Please select a Planned Start Date first.");
                return;
              }
              setPlannedEndDate(new Date(e.target.value).toISOString());
            }}
            required
            disabled={!plannedStartDate}
          />
        </Form.Group>
      </Row>

      <div className={styles.buttonWrapper}>
        <Button type="submit" variant="baseGreen">
          Submit Work Order
        </Button>
      </div>
    </Form>
  );
};

export default CreateForm;
