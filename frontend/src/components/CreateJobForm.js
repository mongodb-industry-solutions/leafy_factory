import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import axiosClient from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../redux/slices/JobSlice";

const CreateJobForm = ({ onCreateSuccess }) => {
  const dispatch = useDispatch();

  const workOrders = useSelector(state => state.WorkOrders.workOrders);

  const machinesReturned = {
    1: [1, 2],
    2: [3, 4]
  };

  const productionLines = [
    { production_line_id: 1, name: "Line 1" },
    { production_line_id: 2, name: "Line 2" },
  ]

  const [jobData, setJobData] = useState({
    workId: "",
    targetOutput: 0,
    jobStatus: "Created",
    productionLineId: "",
    machines: [],
  });

  const [loadingMachines, setLoadingMachines] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Retrieve machines
  useEffect(() => {
    const fetchMachines = async () => {
      setLoadingMachines(true);

    try {
        const response = await axiosClient.get("/machines/machine_details");
        console.log("Fetched machines from API for background processing:", response.data.result);
    } catch (error) {
        console.error("Error fetching machine details:", error);
      } finally {
        setLoadingMachines(false);
      }
    };
    fetchMachines();
  }, []);

  const handleWorkIdChange = e => {
    const selectedWorkId = e.target.value;
    const selectedWorkOrder = workOrders.find(
      (order) => order.id_work === parseInt(selectedWorkId, 10)
    );

    //Valid work order retrieved
    if (!selectedWorkOrder) {
        setErrorMessage("Invalid work order selected.");
        return;
      } else {
        setErrorMessage("");
      }
  
    console.log("Selected Work Order:", selectedWorkOrder);


    //Retrieve fields from selected Work Order
    setJobData(prevData => ({
      ...prevData,
      workId: selectedWorkId,
      targetOutput: selectedWorkOrder.quantity
    }));
  };

  //Prod line selector handling
  const handleProductionLineChange = async (e) => {
    const selectedLineId = e.target.value;
    console.log("Selected Production Line ID:", selectedLineId);

    setJobData((prevData) => ({
      ...prevData,
      productionLineId: selectedLineId,
    }));

    const machinesForLine = machinesReturned[parseInt(selectedLineId, 10)] || [];
    console.log("Machines assigned to production line:", machinesForLine);

    const machineDetails = machinesForLine.map((id_machine) => ({
      id_machine,
      machine_status: ""
    }));

    setJobData((prevData) => ({
      ...prevData,
      machines: machineDetails,
    }));
  };


  const handleSubmit = async event => {
    event.preventDefault();

    if (!jobData.workId){
        setErrorMessage("Work ID must be selected.");
        return;
      }

    if (!jobData.productionLineId) {
        setErrorMessage("Production Line is required.");
        return;
      }
    
    setErrorMessage("")

    const addJobData = {
        work_order_id: jobData.workId,
        factory: {
          factory_id: "qro_fact_1",
          production_lines: [
            {
              production_line_id: jobData.productionLineId,
              machines: jobData.machines.map((machines) => machines.id_machine),
            },
          ],
        },
        target_output: jobData.targetOutput,
      };

      console.log("Job Data to Submit:", addJobData);
  
      try {
        const response = await axiosClient.post("/jobs/", addJobData);
        console.log("Job created successfully", response.data);
        dispatch(addJob(response.data));
        if (onCreateSuccess) {
            onCreateSuccess();
          }
      } catch (error) {
        console.error("Error creating the job:", error);
        setErrorMessage("Failed to create the job. Please try again.");
      }
    };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
    
    <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="id_job">
          <Form.Label>Job ID</Form.Label>
          <Form.Control type="number" value="" readOnly placeholder="ID shown once created" style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed" }} />
        </Form.Group>
        
        <Form.Group as={Col} controlId="work_id">
          <Form.Label>Work ID</Form.Label>
          <Form.Select value={jobData.workId} onChange={handleWorkIdChange} required>
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
      <Form.Control as="textarea" value={jobData.machines.map((machine) => `Machine ID selected: ${machine.id_machine}`).join("\n")} readOnly style={{ height: "100px", cursor: "not-allowed" }} />
        )}
        </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="jobStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control type="text" value={jobData.jobStatus} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed",}}/>
      </Form.Group>

      <Form.Group as={Col} controlId="target_output">
        <Form.Label>Target Output</Form.Label>
        <Form.Control type="number" name="targetOutput" value={jobData.targetOutput} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed",}}/>
      </Form.Group>

    </Row>

    {errorMessage && <p className="text-danger">{errorMessage}</p>}

    <Button type="submit" className="button">Create Job</Button>
  </Form>
);
};

export default CreateJobForm;
