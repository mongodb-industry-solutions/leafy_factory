import "./styles.css";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axiosClient from "../config/axios";
import { Table, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { setAllJobs } from "../redux/slices/JobSlice";
import CreateJobForm from "./CreateJobForm";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.Jobs.jobs);
  const progressLevel = 60
  const [isLoading, setIsLoading] = useState(true);

  //Retrieve location from Jobs tab
  const location = useLocation();

    const fetchJobs = useCallback(async () => {
      try {
        // const response = await axiosClient.get("http://localhost:8000/jobs/");
        const response = await axiosClient.get("/jobs/")

        //console.log("-- getAllJobs", response.data);
        dispatch(setAllJobs(response.data));
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      } finally {
        setIsLoading(false);
      }
    }, [dispatch]);

      useEffect(() => {
        if (location.pathname === "/jobs") {
          fetchJobs();
          const intervalId = setInterval(fetchJobs, 5000);
          return () => {
            clearInterval(intervalId);
          };
        } else {
          console.log("Not on Jobs tab; stopping fetch.");
        }
      }, [fetchJobs, location.pathname]); 

      const handleCreateSuccess = () => {
        fetchJobs();
      }; 

  return (
    <div className="container-fluid">
      <h2 className="history-header">Jobs History</h2>

      <Row className="align-items-start mx-0">
        <Col lg={5} md={6} sm={12} className="form-wrapper px-2">
          <h4>Create Job</h4>
          <CreateJobForm onCreateSuccess={handleCreateSuccess}/>
        </Col>

        <Col lg={7} md={6} sm={12} className="table-wrapper">
          {isLoading
            ? <p>Loading jobs...</p>
            : jobs.length > 0
              ? <Table striped bordered hover responsive className="table">
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
                        <td> {order.creation_date ? (!isNaN(new Date(order.creation_date)) ? new Date(order.creation_date).toISOString() : "Invalid date") : "Loading"} </td>
                        <td>{order.work_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              : <p>No jobs available.</p>}
        </Col>
      </Row>

    <Card className="prod-card">
        <ProgressBar now={progressLevel} label={`${progressLevel}%`} animated />
    </Card>
    </div>
  );
};

export default Jobs;
