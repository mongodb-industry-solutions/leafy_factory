import "./styles.css";
import React, { useEffect, useState, useCallback } from "react";
import {
  useDispatch, // to MODIFY the Factory
  useSelector // to ACCESS the factory
} from "react-redux";
import { useLocation } from "react-router-dom";
import axiosClient from "../config/axios";
import { Table, Row, Col, Pagination } from "react-bootstrap";
import { setAllOrders } from "../redux/slices/WorkOrderslice";
import CreateForm from "./CreateForm";

const WorkOrders = () => {
  const dispatch = useDispatch(); // dispatch to MODIFY redux state
  const workOrders = useSelector(state => state.WorkOrders.workOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;
  //Retrieve location from Work orders tab
  const location = useLocation();

      // load all work orders once this component gets rendered
      const fetchWorkOrders = useCallback(async () => {
        try {
          //const response = await fetch('https://rickandmortyapi.com/api/character')
          const response = await axiosClient.get("/workorders/");
          //const response = await axiosClient.get("http://ec2-3-91-158-15.compute-1.amazonaws.com:8000/workorders/")
          console.log("-- getAllWorkOrders", response.data);
          const workOrders = response.data;
          dispatch(setAllOrders([...workOrders]));
        } catch (error) {
          console.error("There was a problem with your fetch operation:", error);
        } finally {
          setIsLoading(false);
        }
      }, [dispatch]);


      useEffect(() => {
        if (location.pathname === "/workorders" || location.pathname === "/") { // "/" to enable if rendering fails
          fetchWorkOrders();
          const intervalId = setInterval(fetchWorkOrders, 2000);
          return () => {
            clearInterval(intervalId);
          };
        } else {
          console.log("Not on WorkOrders tab; stopping fetch.");
        }
      }, [fetchWorkOrders, location.pathname]); 


      const handleSubmitSuccess = () => {
        fetchWorkOrders();
      };
      
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 500);
      };
    
      const indexOfLastOrder = currentPage * ordersPerPage;
      const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
      const currentOrders = workOrders.slice(indexOfFirstOrder, indexOfLastOrder);
      const totalPages = Math.ceil(workOrders.length / ordersPerPage);
    
      const renderPaginationItems = () => {
        let items = [];
    
      for (let number = 1; number <= totalPages; number++) {
        if (number === 1 || number === totalPages ||(number >= currentPage - 2 && number <= currentPage + 2)
          ) {items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>{number}</Pagination.Item>
            );
          } else if (number === currentPage - 3 || number === currentPage + 3) {
            items.push(<Pagination.Ellipsis key={`ellipsis-${number}`} disabled />);
          }
        }
    
        return items;
      };

  return (
    <div className="container-fluid">
      <h2 className="history-header">Work Orders History</h2>

      <Row className="align-items-start mx-0">
        <Col lg={5} md={6} sm={12} className="form-wrapper px-2">
          <h3>Create a New Work Order</h3>
          <CreateForm onSubmitSuccess={handleSubmitSuccess}/>
        </Col>

        <Col lg={7} md={6} sm={12} className="table-wrapper">
        {isLoading ? (
            <p>Loading work orders...</p>
          ) : currentOrders.length > 0 ? (
            <>
            <Table striped bordered hover responsive className="table">
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
                      <td>{order.wo_status}</td>
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


            <Pagination className="pagination">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1}/>
                {renderPaginationItems()}
              <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}/>
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

export default WorkOrders;
