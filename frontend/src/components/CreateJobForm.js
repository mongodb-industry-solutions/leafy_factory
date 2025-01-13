import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../redux/slices/JobSlice";

const CreateJobForm = () => {
  const dispatch = useDispatch();

  const workOrders = useSelector(state => state.WorkOrders.workOrders);
  const [creationDate] = useState(new Date().toISOString());

  const [jobData, setJobData] = useState({
    workId: "",
    targetOutput: 0,
    jobStatus: "Created",
    creationDate: creationDate
  });

  const handleWorkIdChange = e => {
    const selectedWorkId = e.target.value;
    const selectedWorkOrder = workOrders.find(
      order => order.id_work === parseInt(selectedWorkId)
    );

    //Retrieve fields from selected Work Order
    setJobData(prevData => ({
      ...prevData,
      workId: selectedWorkId,
      targetOutput: selectedWorkOrder ? selectedWorkOrder.quantity : 0
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const addJobData = {
    job_status: jobData.jobStatus,
    creation_date: jobData.creationDate,
    work_id: jobData.workId,
    target_output: jobData.targetOutput
    };

    try {
      const response = await axios.post("/jobs/", addJobData);
      console.log("Job created successfully", response.data);
      dispatch(addJob(response.data));
    } catch (error) {
      console.error("There was an error creating the job:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
    
    <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="work_id">
          <Form.Label>Job ID</Form.Label>
          <Form.Control type="number" value="#" readOnly placeholder="ID shown once created" style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed" }} />
        </Form.Group>
        
        <Form.Group as={Col} controlId="work_id">
          <Form.Label>Work ID</Form.Label>
          <Form.Select value={jobData.workId} onChange={handleWorkIdChange}>
            <option value="">Select Work Order</option>
            {workOrders.filter((order) => order.wo_status === "Created").map((order) => (
                <option key={order.id_work} value={order.id_work}>
                  {order.id_work} - {order.product_name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="target_output">
        <Form.Label>Target Output</Form.Label>
        <Form.Control type="number" name="targetOutput" value={jobData.targetOutput} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed",}}/>
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="jobStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control type="text" value={jobData.jobStatus} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed",}}/>
      </Form.Group>
      <Form.Group as={Col} controlId="creation_date">
        <Form.Label>Creation Date</Form.Label>
        <Form.Control type="text" value={jobData.creationDate} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed",}}/>
      </Form.Group>
    </Row>

    <Button type="submit" className="button">Create Job</Button>
  </Form>
);
};

export default CreateJobForm;
