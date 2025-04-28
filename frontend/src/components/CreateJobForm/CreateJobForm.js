"use client";

import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import axiosClient from "../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../../redux/slices/JobSlice";
import { setAllOrders } from "../../redux/slices/WorkOrderslice";
import styles from "./createjobform.module.css";
import Button from "@leafygreen-ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateJobForm = ({ onCreateSuccess }) => {
  const dispatch = useDispatch();
  const workOrders = useSelector((state) => state.WorkOrders.workOrders);

  const machinesReturned = {
    1: [1, 2],
    2: [3, 4]
  };

  const productionLines = [
    { production_line_id: 1, name: "Line 1" },
    { production_line_id: 2, name: "Line 2" },
  ];

  const [jobData, setJobData] = useState({
    workId: "",
    targetOutput: 0,
    jobStatus: "Created",
    productionLineId: "",
    machines: [],
  });

  const [loadingMachines, setLoadingMachines] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve machines
  useEffect(() => {
    const fetchMachines = async () => {
      setLoadingMachines(true);
      try {
        const response = await axiosClient.get("/machines/machine_details");
        console.log("Fetched machines details:", response.data.result);
      } catch (error) {
        console.error("Error fetching machine details:", error);
      } finally {
        setLoadingMachines(false);
      }
    };
    fetchMachines();
  }, []);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await axiosClient.get("/workorders");
        //console.log(response.data.list);
        dispatch(setAllOrders(response.data.list || []));
      } catch (error) {
        console.error("Error fetching work orders:", error);
      }
    };
    fetchWorkOrders();
  }, [dispatch]);

  const handleWorkIdChange = (e) => {
    const selectedWorkId = e.target.value;
    const selectedWorkOrder = workOrders.find(
      (order) => order.id_work === parseInt(selectedWorkId, 10)
    );

    if (!selectedWorkOrder) {
      setErrorMessage("Invalid work order selected.");
      return;
    } else {
      setErrorMessage("");
    }

    setJobData((prevData) => ({
      ...prevData,
      workId: selectedWorkId,
      targetOutput: selectedWorkOrder.quantity,
    }));
  };

  const handleProductionLineChange = (e) => {
    const selectedLineId = e.target.value;

    setJobData((prevData) => ({
      ...prevData,
      productionLineId: selectedLineId,
    }));

    const machinesForLine = machinesReturned[parseInt(selectedLineId, 10)] || [];
    const machineDetails = machinesForLine.map((id_machine) => ({
      id_machine,
      machine_status: "",
    }));

    setJobData((prevData) => ({
      ...prevData,
      machines: machineDetails,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.success("Job has been sent!");

    if (!jobData.workId) {
      setErrorMessage("Work ID must be selected");
      return;
    }

    if (!jobData.productionLineId) {
      setErrorMessage("Production Line is required");
      return;
    }

    setErrorMessage("");

    const addJobData = {
      work_order_id: jobData.workId,
      factory: {
        factory_id: "qro_fact_1",
        production_lines: [
          {
            production_line_id: jobData.productionLineId,
            machines: jobData.machines.map((machine) => machine.id_machine),
          },
        ],
      },
      target_output: jobData.targetOutput,
    };

    try {
      const response = await axiosClient.post("/jobs", addJobData);
      dispatch(addJob(response.data));

      if (onCreateSuccess) {
        onCreateSuccess();
      }

    } catch (error) {
      //console.warn("Error creating the job:", error);
      toast.error("Failed Job creation");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="id_job">
          <Form.Label>Job ID</Form.Label>
          <Form.Control type="number" readOnly placeholder="ID shown once created" className={styles.formControl} />
        </Form.Group>

        <Form.Group as={Col} controlId="work_id">
          <Form.Label>Work ID</Form.Label>
          <Form.Select value={jobData.workId} onChange={handleWorkIdChange} required>
            <option value="">Select Work Order</option>
            {workOrders
              .filter((order) => order.wo_status === "Created")
              .sort((a, b) => b.id_work - a.id_work)
              .map((order) => (
                <option key={order.id_work} value={order.id_work}>
                  {order.id_work} - {order.product_name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="productionLineId">
          <Form.Label>Production Line</Form.Label>
          <Form.Select value={jobData.productionLineId} onChange={handleProductionLineChange} required>
            <option value="">Select Production Line</option>
            {productionLines.map((line) => (
              <option key={line.production_line_id} value={line.production_line_id}>
                {line.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="id_machine">
          <Form.Label>Machines</Form.Label>
          {loadingMachines ? (
            <p>Loading machines...</p>
          ) : (
            <Form.Control as="textarea" value={jobData.machines.map((machine) => `Machine ID selected: ${machine.id_machine}`).join("\n")} readOnly className={styles.formControl} />
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="target_output">
          <Form.Label>Target Output</Form.Label>
          <Form.Control type="number" value={jobData.targetOutput} readOnly className={styles.formControl} />
        </Form.Group>
      </Row>

      <Row className="mb-3" >
        <Form.Group as={Col} controlId="jobStatus" style={{ display: "none" }}>
          <Form.Label>Status</Form.Label>
          <Form.Control type="text" value={jobData.jobStatus} readOnly className={styles.formControl} />
        </Form.Group>
      </Row>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <div className={styles.buttonWrapper}>
        <Button type="submit" variant="baseGreen">Create Job</Button>
      </div>
    </Form>
  );
};

export default CreateJobForm;

