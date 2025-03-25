"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { PiBracketsCurlyBold } from "react-icons/pi";
import CloseButton from 'react-bootstrap/CloseButton';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import axiosClient from "../../lib/axios";
import { setSelectWorkOrder } from "../../redux/slices/WorkOrderslice";
import { setSelectJob } from "../../redux/slices/JobSlice";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

// Dynamical Code to avoid SSR bug
const Code = dynamic(() => import("@leafygreen-ui/code"), { ssr: false });

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectWorkOrder = useSelector((state) => state.WorkOrders.selectWorkOrder);
  const selectJob = useSelector((state) => state.Jobs.selectJob);
  const [isShrunk, setIsShrunk] = useState(false);
  const [machineDetails, setMachineDetails] = useState(null); 

  const pathname = usePathname();
  const isWorkOrdersPage = pathname === "/";
  const isJobsPage = pathname.includes("/jobs");
  const isStartSimulationPage = pathname.includes("/start-simulation");

  const fetchWorkOrderDetails = async (id_work) => {
    console.log("Fetching work order details for id:", id_work); 
    try {
      const response = await axiosClient.get(`/workorders/${id_work}`);
      dispatch(setSelectWorkOrder(response.data));  
    } catch (error) {
      if (error.response) {
        console.log("Error fetching work order details:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }
    }
  };

  const fetchJobDetails = async (work_id) => {
    console.log("Fetching job details for work_id:", work_id); 
    try {
      const response = await axiosClient.get(`/jobs/${work_id}`);
      dispatch(setSelectJob(response.data));
    } catch (error) {
      if (error.response) {
        console.log("Error fetching job details:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }
    }
  };

  const fetchMachineDetails = async () => {
    if (isStartSimulationPage) {
      try {
        const response = await axiosClient.get("/machines/machine_details");
        setMachineDetails(response.data.result); 
        console.log("Fetched machine details:", response.data.result);
      } catch (error) {
        console.log("Error fetching machine details:", error);
      }
    }
  };

  useEffect(() => {
    if (isWorkOrdersPage && selectWorkOrder?.id_work) {
      fetchWorkOrderDetails(selectWorkOrder.id_work);
    }

    if (isJobsPage && selectJob?.work_id) {
      fetchJobDetails(selectJob.work_id);
    }

    if (isStartSimulationPage) {
      fetchMachineDetails(); 
    }
  }, [selectWorkOrder, selectJob, isWorkOrdersPage, isJobsPage, isStartSimulationPage]);

  const toggleShrink = () => {
    setIsShrunk((prevState) => !prevState);
  };

  if (pathname.includes("/start-simulation") && !machineDetails) {
    return null; 
  }

  return (
    <>
      {isShrunk && (
        <div className={styles["toggle-button"]} onClick={toggleShrink}>
          <OverlayTrigger placement="top" overlay={<Tooltip id="view-sidebar">Show DocModel</Tooltip>} >
            <PiBracketsCurlyBold style={{ color: "#2B664C" }} />
          </OverlayTrigger>
        </div>
      )}

      <div className={`${styles.sidebar} ${isShrunk ? styles.shrunk : ""}`}>
        <div className={styles.sidebarContent}>
          {!isShrunk ? (
            <>
              <OverlayTrigger placement="top" overlay={<Tooltip id="hide-sidebar">Hide sidebar</Tooltip>} >
                <CloseButton className={styles["close-button"]} aria-label="Hide Sidebar" onClick={toggleShrink} />
              </OverlayTrigger>

              {isWorkOrdersPage && (
                <Code language="javascript" className={styles.jsonContent}>
                  {selectWorkOrder ? JSON.stringify(selectWorkOrder, null, 2) : "Please select a Work Order ID"}
                </Code>
              )}

              {isJobsPage && (
                <Code language="javascript" className={styles.jsonContent}>
                  {selectJob ? JSON.stringify(selectJob, null, 2) : "Please select a Job ID"}
                </Code>
              )}

              {isStartSimulationPage && machineDetails && (
                <div>
                  <h3>Machine Details</h3>
                  <Code language="javascript" className={styles.jsonContent}>
                    {JSON.stringify(machineDetails, null, 2)}
                  </Code>
                </div>
              )}
            </>
          ) : (
            <p>Click on a {} ID to see the DocModel</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
