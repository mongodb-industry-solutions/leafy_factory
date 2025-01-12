import "./styles.css";
import React, { useEffect, useState } from "react";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import axiosClient from "../config/axios";
import { Table, Row, Col } from "react-bootstrap";
import { setAllJobs } from "../redux/slices/JobSlice";
import CreateJobForm from "./CreateJobForm";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.Jobs.jobs);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosClient.get("http://localhost:8000/jobs/");
        console.log("-- getAllJobs", response.data);
        dispatch(setAllJobs(response.data));
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <h2 className="text-center">Jobs</h2>

      <Row className="align-items-start mx-0">
        <Col lg={5} md={6} sm={12} className="form-wrapper px-2">
          <h4>Create Job</h4>
          <CreateJobForm />
        </Col>

        <Col lg={7} md={6} sm={12} className="table-wrapper px-2">
          {isLoading
            ? <p>Loading jobs...</p>
            : jobs.length > 0
              ? <Table striped bordered hover responsive className="table-dark-green">
                  <thead>
                    <tr>
                      <th>Job ID</th>
                      <th>Target Output</th>
                      <th>Job Status</th>
                      <th>Creation Date</th>
                      <th>Work Order ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((order) => (
                      <tr key={order.id_job}>
                        <td>{order.id_job}</td>
                        <td>{order.target_output}</td>
                        <td>{order.job_status}</td>
                        <td>{order.creation_date}</td>
                        <td>{order.work_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              : <p>No jobs available.</p>}
        </Col>
      </Row>
    </div>
  );
};

export default Jobs;
