"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { PiBracketsCurlyBold } from "react-icons/pi";
import CloseButton from "react-bootstrap/CloseButton";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { setSelectWorkOrder } from "../../redux/slices/WorkOrderslice";
import { setSelectJob } from "../../redux/slices/JobSlice";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

// Dynamical Code to avoid SSR bug
const Code = dynamic(() => import("@leafygreen-ui/code"), { ssr: false });

const Sidebar = ({ selectedMachineDetails }) => { // Accept selectedMachineDetails as a prop
  const dispatch = useDispatch();
  const selectWorkOrder = useSelector((state) => state.WorkOrders.selectWorkOrder);
  const selectJob = useSelector((state) => state.Jobs.selectJob);
  const [isShrunk, setIsShrunk] = useState(false);

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

  useEffect(() => {
    if (isWorkOrdersPage && selectWorkOrder?.id_work) {
      fetchWorkOrderDetails(selectWorkOrder.id_work);
    }

    if (isJobsPage && selectJob?.work_id) {
      fetchJobDetails(selectJob.work_id);
    }
  }, [selectWorkOrder, selectJob, isWorkOrdersPage, isJobsPage]);

  const toggleShrink = () => {
    setIsShrunk((prevState) => !prevState);
  };

  // Determine if the sidebar should be visible
  const shouldShowSidebar =
    (isWorkOrdersPage && selectWorkOrder) ||
    (isJobsPage && selectJob) ||
    (isStartSimulationPage && selectedMachineDetails);

  if (!shouldShowSidebar) {
    return null; // Do not render the sidebar if no ID is selected
  }

  return (
    <>
      {/* {isShrunk && ( 
        <div className={styles["toggle-button"]} onClick={toggleShrink}>
          <OverlayTrigger placement="top" overlay={<Tooltip id="view-sidebar">Show DocModel</Tooltip>} >
            <PiBracketsCurlyBold style={{ color: "#2B664C" }} />
          </OverlayTrigger>
        </div>
      {/* )} */}

      <div className={`${styles.sidebar} ${isShrunk ? styles.shrunk : ""}`}>
        <div className={styles.sidebarContent}>
          {!isShrunk ? (
            <>
              <OverlayTrigger placement="top" overlay={<Tooltip id="hide-sidebar">Hide sidebar</Tooltip>}>
                <CloseButton
                  className={styles["close-button"]}
                  aria-label="Hide Sidebar"
                  onClick={toggleShrink}
                />
              </OverlayTrigger>

              {isWorkOrdersPage && (
                <Code language="javascript" className={styles.jsonContent}>
                  {JSON.stringify(selectWorkOrder, null, 2)}
                </Code>
              )}

              {isJobsPage && (
                <Code language="javascript" className={styles.jsonContent}>
                  {JSON.stringify(selectJob, null, 2)}
                </Code>
              )}

              {isStartSimulationPage && selectedMachineDetails && ( // Display machine details if available
                <div>
                  <h3>Machine Details</h3>
                  <Code language="javascript" className={styles.jsonContent}>
                    {JSON.stringify(selectedMachineDetails, null, 2)}
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
