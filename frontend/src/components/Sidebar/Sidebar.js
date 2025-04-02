"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import CloseButton from "react-bootstrap/CloseButton";
import Tooltip from "react-bootstrap/Tooltip";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { setSelectWorkOrder } from "../../redux/slices/WorkOrderslice";
import { setSelectJob } from "../../redux/slices/JobSlice";
import { toggleSidebar, openSidebar, setSidebarShrunk } from "../../redux/slices/SidebarSlice";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

// Dynamical Code to avoid SSR bug
const Code = dynamic(() => import("@leafygreen-ui/code"), { ssr: false });

const Sidebar = ({ selectedMachineDetails }) => {
  const dispatch = useDispatch();
  const selectWorkOrder = useSelector((state) => state.WorkOrders.selectWorkOrder);
  const selectJob = useSelector((state) => state.Jobs.selectJob);
  const isShrunk = useSelector((state) => state.Sidebar.isShrunk);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timeSeriesData, setTimeSeriesData] = useState(null);

  const pathname = usePathname();
  const isWorkOrdersPage = pathname === "/";
  const isJobsPage = pathname.includes("/jobs");
  const isStartSimulationPage = pathname.includes("/start-simulation");

  const fetchWorkOrderDetails = async (id_work) => {
    console.log("Fetching work order details for id:", id_work);
    try {
      const response = await axiosClient.get(`/workorders/${id_work}`);
      dispatch(setSelectWorkOrder(response.data));
      dispatch(openSidebar());
    } catch (error) {
      console.log("Error fetching work order details:", error);
    }
  };

  const fetchJobDetails = async (work_id) => {
    console.log("Fetching job details for work_id:", work_id);
    try {
      const response = await axiosClient.get(`/jobs/${work_id}`);
      dispatch(setSelectJob(response.data));
      dispatch(openSidebar());
    } catch (error) {
      console.log("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    if (isWorkOrdersPage && selectWorkOrder?.id_work) {
      fetchWorkOrderDetails(selectWorkOrder.id_work);
    }

    if (isJobsPage && selectJob?.work_id) {
      fetchJobDetails(selectJob.work_id);
    }

    if (isStartSimulationPage && selectedMachineDetails?.id_machine) {
      fetchMachineDetailsById(selectedMachineDetails.id_machine);
    }

    console.log("The Sidebar is open");
    console.log("Web Socket Sidebar");

    // Ensure selectedMachineDetails.id_machine is available
    const machineId = selectedMachineDetails?.id_machine || "default_machine_id";
    const wsUrl = `ws://localhost:8000/ws/stream_sensor/${machineId}`;
    const ws = new WebSocket(wsUrl);

    // Handle WebSocket events
    ws.onopen = () => {
      console.log("WebSocket connected to MongoDB Change Stream");
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(addSensorData(data));
      console.log(data);
    };

    // Clean up on component unmount
    return () => {
      console.log("Cleaning up WebSocket connection");
      ws.close();
    };
  }, [selectWorkOrder, selectJob, selectedMachineDetails, isWorkOrdersPage, isJobsPage, isStartSimulationPage]);

  const toggleShrink = () => {
    dispatch(toggleSidebar());
  };

  const reopenSidebar = () => {
    dispatch(setSidebarShrunk(false));
  };

  // Sidebar visibility
  const shouldShowSidebar =
    (isWorkOrdersPage && selectWorkOrder) ||
    (isJobsPage && selectJob) ||
    (isStartSimulationPage && selectedMachineDetails);

  if (!shouldShowSidebar) {
    return null;
  }

  return (
    <>
      <div className={`${styles.sidebar} ${isShrunk ? styles.shrunk : ""}`}>
        <div className={styles.sidebarContent}>
          <OverlayTrigger placement="top" overlay={<Tooltip id="hide-sidebar">Hide sidebar</Tooltip>}>
            <CloseButton
              className={styles["close-button"]}
              aria-label="Hide Sidebar"
              onClick={() => {
                if (isShrunk) {
                  reopenSidebar();
                } else {
                  toggleShrink();
                }
              }}
            />
          </OverlayTrigger>

          {!isShrunk && (
            <>
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

              {isStartSimulationPage && selectedMachineDetails && (
                <div className="tabs">
                  <Tabs
                    aria-label="tabs"
                    onChange={(index) => setSelectedIndex(index)}
                    tab={selectedIndex}
                  >
                    <Tab name="Machine Details">
                      <div>
                        <Code language="javascript" className={styles.jsonContent}>
                          {JSON.stringify(selectedMachineDetails, null, 2)}
                        </Code>
                      </div>
                    </Tab>
                    <Tab name="Time Series">
                      <div>
                        {timeSeriesData ? (
                          <Code language="javascript" className={styles.jsonContent}>
                            {JSON.stringify(timeSeriesData, null, 2)}
                          </Code>
                        ) : (
                          <p>Loading Time Series data...</p>
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
