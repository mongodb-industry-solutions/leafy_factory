"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import CloseButton from "react-bootstrap/CloseButton";
import Tooltip from "react-bootstrap/Tooltip";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { Select, Option } from "@leafygreen-ui/select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { setSelectWorkOrder } from "../../redux/slices/WorkOrderslice";
import { setSelectJob } from "../../redux/slices/JobSlice";
import { addSensorData } from "@/redux/slices/ShopFloorslice";
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
  const [selectedOption, setSelectedOption] = useState(""); 
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sensorData = useSelector(state => state.ShopFloor.sensorData)

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
  }, []);

  useEffect(() => {
    if (!selectedOption) return;

    console.log("Web Socket Sidebar");

    // Create WebSocket URL based on backend URL (replace http with ws)
    const wsUrl = `ws://localhost:8000/ws/stream_sensor/${selectedOption}`;
    const ws = new WebSocket(wsUrl);

    // Handle WebSocket events
    ws.onopen = () => {
      console.log(`WebSocket connected to MongoDB Change Stream for option: ${selectedOption}`);
    };
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
    ws.onerror = (error) => {
      console.warn('WebSocket error:', error);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(addSensorData(data)); 
      console.log("Received sensor data:", data);
    };

    // Clean up on component unmount or when selectedOption changes
    return () => {
      ws.close();
    };
  }, [selectedOption]); 

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
                        <Select
                          value={selectedOption}
                          onChange={(value) => setSelectedOption(value)}
                          aria-label="Select a machine"
                        >
                          <Option value="1">Machine 1</Option>
                          <Option value="2">Machine 2</Option>
                          <Option value="3">Machine 3</Option>
                          <Option value="4">Machine 4</Option>
                        </Select>

                        {sensorData && sensorData.length > 0 ? (
                          <Code language="javascript" className={styles.jsonContent}>
                            {JSON.stringify(sensorData[sensorData.length - 1], null, 2)}
                          </Code>
                        ) : (
                          <p>Start the Simulator and Select a Machine</p>
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
