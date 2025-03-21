"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../lib/axios";
import { Table, Row, Col, Container, Pagination } from "react-bootstrap";
import { setAllJobs, setSelectJob } from "../../redux/slices/JobSlice";
import CreateJobForm from "../../components/CreateJobForm/CreateJobForm";
import styles from "./jobs.module.css";
import { H2, H3, Body } from "@leafygreen-ui/typography";
import Badge from "@leafygreen-ui/badge";
import Icon from "@leafygreen-ui/icon";
import IconButton from "@leafygreen-ui/icon-button";
import Tooltip from "@leafygreen-ui/tooltip";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.Jobs.jobs);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 15;

  const jobsRef = useRef([]);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axiosClient.get("/jobs");
      dispatch(setAllJobs(response.data.list));
    } catch (error) {
      console.log("There was a problem with your fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleCreateSuccess = async () => {
    try {
      setIsLoading(true);
      await fetchJobs();
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to refresh job data after submission:", error);
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      if (number === 1 || number === totalPages || (number >= currentPage - 2 && number <= currentPage + 2)) {
        items.push(
          <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
            {number}
          </Pagination.Item>
        );
      } else if (number === currentPage - 3 || number === currentPage + 3) {
        items.push(<Pagination.Ellipsis key={`ellipsis-${number}`} disabled />);
      }
    }
    return items;
  };

  const handleJobClick = (work_id) => {
    console.log("Clicked on job with work order ID:", work_id);
    fetchJobDetails(work_id);
  };

  const fetchJobDetails = async (work_id) => {
    try {
                                              // jobs/{id_work} where work_id is the id_work sent to the API for the Sidebar
      const response = await axiosClient.get(`/jobs/${work_id}`);
      dispatch(setSelectJob(response.data));
    } catch (error) {
      console.log("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <Container fluid className={styles.containerFluid}>
      <H2 className={styles.historyHeader}>Jobs: MES System Simulator</H2>

      <Row className="align-items-start">
        <Col xs={12} className={styles.formWrapper}>
          <H3 className={styles.H3}>Create Job</H3>
          <CreateJobForm onCreateSuccess={handleCreateSuccess} />
        </Col>

        <Col xs={12} className={styles.tableWrapper}>
          {isLoading ? (
            <Body>Loading jobs...</Body>
          ) : currentJobs.length > 0 ? (
            <>
              <Table striped bordered hover responsive className={styles.table}>
                <thead>
                  <tr>
                    <th>Actions</th>
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
                      <td>
                        <Tooltip align="top" justify="middle" trigger={
                          <IconButton aria-label="Doc Model" className={styles.actionButton} onClick={() => handleJobClick(job.work_id)}>
                            <Icon glyph="CurlyBraces" />
                          </IconButton>
                        }>
                          ID's DocModel
                        </Tooltip>
                      </td>
                      <td>{job.id_job}</td>
                      <td>{job.target_output}</td>
                      <td>
                        <Badge variant={
                          job.job_status === "Completed" ? "green" :
                          job.job_status === "Created" ? "blue" :
                              "lightGray"
                        }>
                          {job.job_status}
                        </Badge>
                      </td>
                      <td>{job.creation_date ? !isNaN(new Date(job.creation_date)) ? new Date(job.creation_date).toISOString() : "Invalid date" : "Loading"}</td>
                      <td>{job.work_id}</td>
                      <td>{job.nOk_products}</td>
                      <td>{job.quality_rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Pagination className={styles.pagination}>
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
