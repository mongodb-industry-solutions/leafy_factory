import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addJob } from "../redux/slices/JobSlice";

const CreateJobForm = () => {
  const dispatch = useDispatch();
  
  const [status] = useState("Created");
  const [creationDate] = useState(new Date().toISOString());
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const addJobData = {
      status: status,
      creation_date: creationDate,
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
        <Form.Group as={Col} controlId="target_output">
          <Form.Label>Target Output</Form.Label>
          <Form.Control type="text"/>
        </Form.Group>

      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control type="text" value={status} readOnly />
        </Form.Group>

        <Form.Group as={Col} controlId="creation_date">
          <Form.Label>Creation Date</Form.Label>
          <Form.Control type="text" value={creationDate} readOnly />
        </Form.Group>
      </Row>

      <Button type="submit" className="button">Create Job</Button>
    </Form>
  );
};

export default CreateJobForm;
