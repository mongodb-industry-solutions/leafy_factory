"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useRouter } from "next/router";
import axiosClient from "../../lib/axios";
import { Table, Row, Col, ProgressBar, Container, Card, Pagination } from "react-bootstrap";
import { setAllJobs } from "../../redux/slices/JobSlice";
import CreateJobForm from "../../components/CreateJobForm/CreateJobForm";


const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.Jobs.jobs);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 15;

  const jobsRef = useRef([]);

  const fetchJobs = useCallback(async () => {
    try {
      // const response = await axiosClient.get("http://localhost:8000/jobs/");
      const response = await axiosClient.get("/jobs/");  // Fetch all 100 jobs
      dispatch(setAllJobs(response.data));
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchJobs();
    jobsRef.current = jobs;
  }, [fetchJobs, jobs]);

  const handleCreateSuccess = async () => {
    try {
      setIsLoading(true);
      await fetchJobs();
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to refresh job data after submission:", error);
      setIsLoading(false);
    }
  };

  // pagination loading and deter.
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 9000);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  //page numbers rendering
  const renderPaginationItems = () => {
    let items = [];

    for (let number = 1; number <= totalPages; number++) {
      if (number === 1 || number === totalPages || (number >= currentPage - 2 && number <= currentPage + 2)) {
        items.push(
          <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>{number}</Pagination.Item>
        );
      } else if (number === currentPage - 3 || number === currentPage + 3) {
        items.push(<Pagination.Ellipsis key={`ellipsis-${number}`} disabled />);
      }
    }
    return items;
  };

  return (
    <Container fluid>
      <h2 className="history-header">JOBS: MES System Simulator</h2>

      <Row className="align-items-start">
        <Col lg={4} md={6} sm={12} className="form-wrapper">
          <h3>Create Job</h3>
          <CreateJobForm onCreateSuccess={handleCreateSuccess} />
        </Col>

        <Col lg={8} md={12} className="table-wrapper">
          {isLoading ? (
            <p>Loading jobs...</p>
          ) : currentJobs.length > 0 ? (
            <>
              <Table striped bordered hover responsive className="table">
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Target Output</th>
                    <th>Job Status</th>
                    <th>Creation Date</th>
                    <th>Work Order ID</th>
                    <th>nOK Products (units)</th>
                    <th>Quality Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {currentJobs.map((job) => (
                    <tr key={job.id_job}>
                      <td>{job.id_job}</td>
                      <td>{job.target_output}</td>
                      <td>{job.job_status}</td>
                      <td>{job.creation_date ? !isNaN(new Date(job.creation_date)) ? new Date(job.creation_date).toISOString() : "Invalid date" : "Loading"}</td>
                      <td>{job.work_id}</td>
                      <td>{job.nOk_products}</td>
                      <td>{job.quality_rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Pagination className="pagination">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                {renderPaginationItems()}
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>
            </>
          ) : (
            <p>No jobs available.</p>
          )}
        </Col>
      </Row>

    </Container>
  );
};

export default Jobs;
