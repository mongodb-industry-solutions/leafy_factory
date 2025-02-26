"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "./../lib/axios";  
import { Table, Row, Col, Pagination } from "react-bootstrap";
import { setAllOrders } from "../redux/slices/WorkOrderslice";
import CreateForm from "../components/CreateForm/CreateForm";
import { H2, H3, Body } from "@leafygreen-ui/typography";
import Badge from "@leafygreen-ui/badge";
import styles from "./workorders.module.css";

const WorkOrdersPage = () => {
  const dispatch = useDispatch();
  const workOrders = useSelector((state) => state.WorkOrders.workOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  const fetchWorkOrders = useCallback(async () => {
    try {
      const response = await axiosClient.get("/workorders");
      const workOrders = response.data.list;
      dispatch(setAllOrders([...workOrders])); 
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchWorkOrders();
    const intervalId = setInterval(fetchWorkOrders, 2000);
    return () => clearInterval(intervalId);
  }, [fetchWorkOrders]);

  const handleSubmitSuccess = () => {
    fetchWorkOrders();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = workOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(workOrders.length / ordersPerPage);

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

  return (
    <div fluid className={styles.containerFluid}>
      <H2 className={styles.historyHeader}>Work Orders: ERP System Simulator</H2>

      <Row className="align-items-start">
        <Col lg={5} md={6} sm={12} className={styles.formWrapper}>
          <H3 className={styles.H3}>Create a New Work Order</H3>
          <CreateForm onSubmitSuccess={handleSubmitSuccess} />
        </Col>

        <Col lg={7} md={6} sm={12} className={styles.tableWrapper}>
          {isLoading ? (
            <p>Loading work orders...</p>
          ) : workOrders && workOrders.length > 0 ? (
            <>
              <Table striped bordered hover responsive className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Creation Date</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Planned Start Date</th>
                    <th>Planned End Date</th>
                    <th>Planned Cost</th>
                    <th>Actual Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id_work}>
                      <td>{order.id_work}</td>
                     

                      <td>
                        <Badge variant={
                          order.wo_status === "Completed" ? "green" :
                          order.wo_status === "Created" ? "blue" :
                              "lightGray"
                        }>
                          {order.wo_status}
                        </Badge>
                      </td>

                      <td>{order.creation_date}</td>
                      <td>{order.product_name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.planned_start_date}</td>
                      <td>{order.planned_end_date}</td>
                      <td>{order.planned_cost}</td>
                      <td>{order.actual_cost}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Pagination  className={styles.pagination}>
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                {renderPaginationItems()}
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </>
          ) : (
            <p>No work orders available.</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WorkOrdersPage;
