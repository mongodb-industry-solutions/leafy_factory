"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Code from "@leafygreen-ui/code";
import { PiBracketsCurlyBold } from "react-icons/pi";
import axiosClient from "../../lib/axios";
import { setSelectWorkOrder } from "../../redux/slices/WorkOrderslice";
import { setSelectJob } from "../../redux/slices/JobSlice";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectWorkOrder = useSelector((state) => state.WorkOrders.selectWorkOrder);
  const selectJob = useSelector((state) => state.Jobs.selectJob);
  const [isShrunk, setIsShrunk] = useState(false);

  const pathname = usePathname();
  const isWorkOrdersPage = pathname === "/";
  const isJobsPage = pathname.includes("/jobs");

  // Fetch Work Order Details
  const fetchWorkOrderDetails = async (id_work) => {
    console.log("Fetching work order details for id:", id_work); // Check the id_work value
    try {
      const response = await axiosClient.get(`/workorders/${id_work}`);
      dispatch(setSelectWorkOrder(response.data));  // Store work order data
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

  // Fetch Job Details (using work_id as id_work in the API request)
  const fetchJobDetails = async (work_id) => {
    console.log("Fetching job details for work_id:", work_id); // Check the work_id value
    try {
      // Send the work_id as id_work in the API request URL for jobs/{id_work}
      const response = await axiosClient.get(`/jobs/${work_id}`);  // Now this will correctly be jobs/{id_work}
      dispatch(setSelectJob(response.data));  // Store job data
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
      fetchWorkOrderDetails(selectWorkOrder.id_work); // Use id_work for Work Orders API
    }

    if (isJobsPage && selectJob?.work_id) {
      // Here is the critical fix: sending the work_id from the job object to jobs/{id_work}
      fetchJobDetails(selectJob.work_id);  // Send work_id, which will be used as id_work in the API
    }
  }, [selectWorkOrder, selectJob, isWorkOrdersPage, isJobsPage]);

  const toggleShrink = () => {
    setIsShrunk((prevState) => !prevState);
  };

  if (pathname.includes("/start-simulation")) {
    return null;
  }

  return (
    <>
      <div className={styles["toggle-button"]} onClick={toggleShrink}>
        <PiBracketsCurlyBold style={{ color: "#2B664C" }} />
      </div>

      <div className={`${styles.sidebar} ${isShrunk ? styles.shrunk : ""}`}>
        <div className={styles.sidebarContent}>
          {!isShrunk ? (
            <>
              {isWorkOrdersPage && (
                <Code language="javascript" className={styles.jsonContent}>
                  {selectWorkOrder ? JSON.stringify(selectWorkOrder, null, 2) : "No Work Order Selected"}
                </Code>
              )}

              {isJobsPage && (
                <Code language="javascript" className={styles.jsonContent}>
                  {selectJob ? JSON.stringify(selectJob, null, 2) : "No Job Selected"}
                </Code>
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
