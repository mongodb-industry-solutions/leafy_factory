import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addOrder } from "../redux/slices/WorkOrderslice";


const CreateForm = () => {

  const dispatch = useDispatch();
  const [product, setProduct] = useState("Titanium Hammer");
  const [quantity, setQuantity] = useState(1);
  //const [plannedCost, setPlannedCost] = useState(getPlannedCost("Titanium Hammer"));
  const [creationDate] = useState(new Date().toLocaleDateString());
  const [plannedStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toLocaleDateString();
  });

  const [plannedEndDate, setPlannedEndDate] = useState(() => {
    const startDate = new Date(plannedStartDate);
    startDate.setDate(startDate.getDate() + 10);
    return startDate.toLocaleDateString();
  });

  useEffect(() => {
    const startDate = new Date(plannedStartDate);
    startDate.setDate(startDate.getDate() + 7); // Add 7 days to planned start date
    setPlannedEndDate(startDate.toLocaleDateString());
  }, [plannedStartDate]); 
  
  const handleSubmit = async (event) => {
    event.preventDefault();


    const addWorkOrder = {
      planned_start_date: plannedStartDate,
      planned_end_date: plannedEndDate,
      quantity: quantity,
      wo_status: "Created",
      //planned_cost: plannedCost,
      creation_date: creationDate,
      product_cat_id: product === "Titanium Hammer" ? 1 : product === "2 Step ladder" ? 2 : 0,
    };

    try {
      const response = await axios.post("http://localhost:8000/workorders/", addWorkOrder);
      console.log("Work order created successfully", response.data);
      dispatch(addOrder(response.data));

    } catch (error) {
      console.error("There was an error creating the work order:", error);
    }
  };

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setProduct(selectedProduct);
    //setPlannedCost(getPlannedCost(selectedProduct));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="work_id">
          <Form.Label>Work Order ID</Form.Label>
          <Form.Control type="number" value="#" readOnly placeholder="ID shown once created" style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed" }} />
        </Form.Group>

        <Form.Group as={Col} controlId="product_select">
          <Form.Label>Product</Form.Label>
          <Form.Select value={product} onChange={handleProductChange}>
            <option value="Titanium Hammer">Titanium Hammer</option>
            <option value="2 Step ladder">2 Step ladder</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        {/*<Form.Group as={Col} controlId="planned_cost">
          <Form.Label>Planned Cost $</Form.Label>
          <Form.Control type="text" value={plannedCost} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed" }} />
        </Form.Group>*/}

        <Form.Group as={Col} controlId="wo_status">
          <Form.Label>Work Order Status</Form.Label>
          <Form.Control type="text" value="Created" readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed" }} />
        </Form.Group>

        <Form.Group as={Col} controlId="form_quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
            {[...Array(30).keys()].map(number =>
              <option key={number + 1} value={number + 1}>
                {number + 1}
              </option>
            )}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="creation_date">
          <Form.Label>Creation Date</Form.Label>
          <Form.Control type="text" value={creationDate} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed" }} />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="planned_start_date">
          <Form.Label>Planned Start Date</Form.Label>
          <Form.Control type="text" value={plannedStartDate} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed" }} />
        </Form.Group>

        <Form.Group as={Col} controlId="planned_end_date">
          <Form.Label>Planned End Date</Form.Label>
          <Form.Control type="text" value={plannedEndDate} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed" }} />
        </Form.Group>
      </Row>

      <Row className="mb-3" style={{ display: "none" }}>
        <Form.Group as={Col} controlId="actual_start_date">
          <Form.Label>Actual Start Date</Form.Label>
          <Form.Control type="text" value="" readOnly />
        </Form.Group>

        <Form.Group as={Col} controlId="actual_end_date">
          <Form.Label>Actual End Date</Form.Label>
          <Form.Control type="text" value="" readOnly />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">Create Work Order</Button>
    </Form>
  );
};

export default CreateForm;
