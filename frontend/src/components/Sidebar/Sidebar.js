"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Code from "@leafygreen-ui/code";
import { PiBracketsCurlyBold } from "react-icons/pi";
import axiosClient from "../../lib/axios";
import { setAllOrders, setTreeOrders } from "../../redux/slices/WorkOrderslice";
import { setAllJobs, setTreeJobs } from "../../redux/slices/JobSlice";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const workOrders = useSelector((state) => state.WorkOrders.workOrders);
  const treeOrders = useSelector((state) => state.WorkOrders.treeOrders);
  const jobs = useSelector((state) => state.Jobs.jobs);
  const treeJobs = useSelector((state) => state.Jobs.treeJobs);
  const [isShrunk, setIsShrunk] = useState(false);

  const pathname = usePathname();

  const isWorkOrdersPage = pathname === "/";
  const isJobsPage = pathname.includes("/jobsorders");
  const isSimulationPage = pathname.includes("/start-simulation");

  const fetchData = async (endpoint) => {
    try {
      const response = await axiosClient.get(endpoint);
      console.log(`Data from ${endpoint}:`, response.data);

      if (endpoint === "/workorders/tree") {
        dispatch(setTreeOrders(response.data.list || []));
      } else if (endpoint === "/workorders") {
        dispatch(setAllOrders(response.data.list || []));
      } else if (endpoint === "/jobs/tree") {
        dispatch(setTreeJobs(response.data.list || []));
      } else if (endpoint === "/jobs") {
        dispatch(setAllJobs(response.data.list || []));
      }
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    console.log("Current Path:", pathname);
    
    if (isWorkOrdersPage) {
      dispatch(setTreeOrders([]));  
      fetchData("/workorders/tree");
    } else if (isJobsPage) {
      dispatch(setTreeJobs([])); 
      fetchData("/jobs/tree");
    }
  }, [pathname, isWorkOrdersPage, isJobsPage, dispatch]);

  const toggleShrink = () => {
    setIsShrunk(!isShrunk);
  };

  const renderWorkOrders = () => {
    console.log("Returned tree orders:", treeOrders);
    return treeOrders.length > 0 ? (
      treeOrders.map((order) => (
        <div key={order.id_work} className={styles.cardItem}>
          {JSON.stringify(order, null, 2)}
        </div>
      ))
    ) : (
      <p>No tree orders available</p>
    );
  };

  const renderJobs = () => {
    console.log("Returned tree Jobs:", treeJobs);
    return treeJobs.length > 0 ? (
      treeJobs.map((job) => (
        <div key={job.id_job} className={styles.cardItem}>
          {JSON.stringify(job, null, 2)}
        </div>
      ))
    ) : (
      <p>No tree jobs available</p>
    );
  };

  if (isSimulationPage) {
    return null;
  }

  return (
    <>
        <div className={styles["toggle-button"]} onClick={toggleShrink}>
        {isShrunk ? (
        <PiBracketsCurlyBold  style={{ color: "#2B664C" }} />
        ) : (
        <PiBracketsCurlyBold style={{ color: "#2B664C" }} />
        )}
        </div>

        <div className={`${styles.sidebar} ${isShrunk ? styles.shrunk : ""}`}>
        
        <div className={styles.sidebarContent}>
            {!isShrunk ? (
            <Code language="javascript" className={styles.jsonContent}>
                {isWorkOrdersPage
                ? JSON.stringify(treeOrders, null, 2)
                : JSON.stringify(treeJobs, null, 2)}
            </Code>
            ) : (
            <div className={styles.details}>
                {isWorkOrdersPage ? renderWorkOrders() : isJobsPage ? renderJobs() : <p>No data available</p>}
            </div>
            )}
        </div>
        </div>
    </>
  );
};

export default Sidebar;
