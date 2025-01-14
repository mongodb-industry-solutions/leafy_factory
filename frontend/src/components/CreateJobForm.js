import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../redux/slices/JobSlice";

const CreateJobForm = () => {
  const dispatch = useDispatch();

  const workOrders = useSelector(state => state.WorkOrders.workOrders);
  //const [creationDate] = useState(new Date().toISOString());

  const productionLines = [
    { production_line_id: 1, name: "Line 1" },
    { production_line_id: 2, name: "Line 2" },
  ]

  const [jobData, setJobData] = useState({
    workId: "",
    targetOutput: 0,
    jobStatus: "Created",
    //creationDate: creationDate,
    productionLineId: "",
    machines: [],
  });

  const [allMachines, setAllMachines] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [loadingMachines, setLoadingMachines] = useState(false);

  //Retrieve machines
  useEffect(() => {
    const fetchMachines = async () => {
      setLoadingMachines(true);
      try {
        const response = await axios.get("http://ec2-3-91-158-15.compute-1.amazonaws.com:8000/machines/machine_details");
        console.log("Fetched machines from API:", response.data.result);
        setAllMachines(response.data.result);
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
      (order) => order.id_work === parseInt(selectedWorkId)
    );
    console.log("Selected Work Order:", selectedWorkOrder);


    //Retrieve fields from selected Work Order
    setJobData(prevData => ({
      ...prevData,
      workId: selectedWorkId,
      targetOutput: selectedWorkOrder ? selectedWorkOrder.quantity : 0
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

    const machinesForLine = allMachines.filter(
        (machine) => machine.production_line_id === parseInt(selectedLineId)
      );
      console.log("Filtered Machines for Line:", machinesForLine);
      setFilteredMachines(machinesForLine);
    };


  const handleSubmit = async event => {
    event.preventDefault();

    const addJobData = {
        work_order_id: jobData.workId,
        factory: {
          factory_id: "qro_fact_1",
          production_lines: [
            {
              production_line_id: jobData.productionLineId,
              machines: filteredMachines.map((machines) => machines.id_machine),
            },
          ],
        },
        target_output: jobData.targetOutput,
      };

      console.log("Job Data to Submit:", addJobData);
  
      try {
        const response = await axios.post("http://ec2-3-91-158-15.compute-1.amazonaws.com:8000/jobs/", addJobData);
        console.log("Job created successfully", response.data);
        dispatch(addJob(response.data));
      } catch (error) {
        console.error("Error creating the job:", error);
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
        <Form.Group as={Col} controlId="productionLineId">
          <Form.Label>Production Line</Form.Label>
          <Form.Select value={jobData.productionLineId}onChange={handleProductionLineChange}>
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
        <Form.Group as={Col} controlId="machines">
          <Form.Label>Machines</Form.Label>
          {loadingMachines ? (  
            <p>Loading machines...</p>
          ) : (  
            <Form.Control as="textarea" value={filteredMachines.map((machines) => `ID: ${machines.id_machine}, Status: ${machines.machine_status}, Operator: ${machines.operator}`).join("\n")} readOnly style={{ height: "100px", cursor: "not-allowed"}}/>
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

      {/*<Form.Group as={Col} controlId="creation_date">
        <Form.Label>Creation Date</Form.Label>
        <Form.Control type="text" value={jobData.creationDate} readOnly style={{ backgroundColor: "#f8f9fa", userSelect: "none", borderColor: "#ddd", cursor: "not-allowed",}}/>
      </Form.Group>*/}
    </Row>

    <Button type="submit" className="button">Create Job</Button>
  </Form>
);
};

export default CreateJobForm;
