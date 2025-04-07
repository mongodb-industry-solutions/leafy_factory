"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./NavigationBar.module.css";
import InfoWizard from "../InfoWizard/InfoWizard";
import { useState } from "react";
import { usePathname } from "next/navigation";


const NavigationBar = () => {
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const pathname = usePathname(); 

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Leafy Factory Logo"
            width={200}
            height={35}
            priority
          />
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link
          href="/"
          className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        >
          Work Orders
        </Link>
        <Link
          href="/jobsorders"
          className={`${styles.link} ${pathname === "/jobsorders" ? styles.active : ""}`}
        >
          Jobs
        </Link>
        <Link
          href="/start-simulation"
          className={`${styles.link} ${pathname === "/start-simulation" ? styles.active : ""}`}
        >
          Shopfloor Simulator
        </Link>
      </div>

      <InfoWizard
        open={openHelpModal}
        setOpen={setOpenHelpModal}
        tooltipText="Tell me more!"
        iconGlyph="Wizard"
        sections={[
          {
            heading: "Instructions and Talk Track",
            content: [
              {
                heading: "Demo Purpose",
                body: "The demo simulates a simplified view of the tasks carried out in a Factory Shopfloor in one day going from ERP (Work Orders) to the MES (Jobs) and lastly to the Shopfloor (Simulator).",
              },
              {
                heading: "How to Demo",
                body: [
                  {
                    heading: 'Shopfloor Simulator',
                    body: [
                      'Click on Start Shopfloor Simulation',
                      'This will trigger the machines to default temperature and vibration values to “0” and will track their changes as the process is being fulfilled.'
                    ]
                  },
                  {
                    heading: 'Work Orders',
                    body: [
                      'Once the simulation is running, go to the Work orders tab and allow the Table of Work Orders History to be shown',
                      'Fill in the "Create a New Work Order” form, and select the desired product (Cogwheel or Gear housing) & quantity for target output and Submit.',
                      'Wait a few seconds for the work order to be received, it will be shown on the Work Orders history under “Created” status'
                    ]
                  },
                  {
                    heading: 'Jobs',
                    body: [
                      'With a new Work Order created, go to the Jobs tab you’ll be able to select it in the job form from the dropdown field and choose the production line (machines get self populated).',
                      'Wait a few seconds for the job to be received, it will be shown on the Jobs History under “Created” status and on the Job Progress table with the current Job ID being executed. ',
                      'The quality rate and nOK products will remain blank until the job is completed.'
                    ]
                  },
                  {
                    heading: 'View Machine Status',
                    body: [
                      'Return to the Shofloor Simulator tab where you’ll be able to review the factory details, Availability of the machines, temperature, vibration, last maintenance and their stats.',
                      'Every time a job is being executed, the Machines status will change from “Available” to “Running” depending on the selected production line.',
                    ]
                  },
                  {
                    heading: 'Change Machine Vibration and Temperature',
                    body: [
                      'Update the Temperature and Vibration per machine, depending on the selected range, you’ll visualize ifthe values are Normal, High or Excessive from the already established threshold.',
                      'When the values are submitted in the form, if sent to a “Running” machine (from an active job), it will directly aect the nOK products and quality rate and will be shown in the machine’s JSON data',
                      'With the Simulation running, you can see the Chart retrieving information every minute',
                      'Once the job is “Completed” the machine status will return to Available”.'
                    ]
                  },
                  {
                    heading: 'Review Quality Rate and nOK Parts',
                    body: [
                      'Once the job is under “Completed” status, we’ll no longer see it in the “Jobs Progress” table and we’ll be able to review the nOK parts and quality rate depending on the values sent in the “Change machine values” form',
                    ]
                  },
                  {
                    heading: 'Review Planned vs. Actual Cost',
                    body: [
                      'Once the job is under “Completed” status, under Work Orders tab, we’ll be able to see the planned and actual Cost, this will dier wether if our quality rate is other than 100%',
                    ]
                  },

                ],
              },
            ],
          },
          {
            heading: "Behind the Scenes",
            content: [
              {
                heading: "Data Flow",
                body: "",
              },
              {
                image: {
                  src: "./demoOverview.png",
                  alt: "Architecture",
                },
              },
            ],
          },
          {
            heading: "Why MongoDB?",
            content: [
              {
                heading: "Flexible Schema Design",
                body: "Manufacturing environments often deal with highly variable data structures—from machine sensor data to ERP records. MongoDB’s document-oriented design allows data to be stored in JSON-like structures, which can be adapted to capture a wide range of data formats. Unlike traditional relational databases, MongoDB’s schema flexibility means that changes in data requirements, such as adding new sensors or modifying machine attributes, can be easily managed without the need for a rigid data schema.",
              },
              {
                heading: "Real-Time Data Processing",
                body: " MongoDB supports real-time data ingestion through technologies like Kafka change streams and MQTT, making it easy to capture live data from shop floor machines and synchronize with ERP and MES systems. This ability to process streaming data from multiple sources ensures that the UNS provides up-to-date information, supporting timely interventions and data-driven decisions.",
              },
              {
                heading: "Rich Querying and Analytics",
                body: "MongoDB’s aggregation framework and powerful querying capabilities enable in-depth analysis across different data streams. For instance, production teams can cross-reference MES quality metrics with machine sensor data to identify trends and improve quality control processes. Similarly, finance teams can analyze ERP cost data alongside MES output, offering a holistic view of operational efficiency and costs.",
              },
              {
                heading: "Scalability for Growing Operations",
                body: " MongoDB’s distributed architecture allows it to scale horizontally, which is especially valuable in large manufacturing environments where data volumes can grow rapidly. MongoDB clusters can be easily expanded, ensuring the UNS remains responsive even as more machines and production lines are added.",
              },
              {
                heading: "Predictive Maintenance Enablement",
                body: "With MongoDB as a central repository, manufacturers can leverage predictive maintenance strategies by analyzing historical data patterns from machine sensors, detecting anomalies, and predicting maintenance needs. This proactive approach helps reduce machine downtime, optimize maintenance schedules, and ultimately lower operational costs.",
              },
              {
                heading: "High Availability",
                body: " One of the downsites of a UNS is that the central data repository becomes a single point of failure. MongoDB’s replica set guarantees ultra high availability and updates without any downtime.",
              },
            ],
          },
        ]}
      />

    </nav>
  );
};
export default NavigationBar;