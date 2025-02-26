"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavigationBar.module.css";
import InfoWizard from "../InfoWizard/InfoWizard";
import { useState } from "react";

const NavigationBar = () => {
  const [openHelpModal, setOpenHelpModal] = useState(false);
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
        <Link href="/" className={styles.link}>Work Orders</Link>
        <Link href="/jobsorders" className={styles.link}>Jobs</Link>
        <Link href="/start-simulation" className={styles.link}>Shopfloor Simulator</Link>
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
                      'Fill in the "Create a New Work Order” form, and select the desired product (Titanium Hammer or 2 Step Ladder) & quantity for target output and Submit.',
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
                heading: "Flexibility",
                body: "MongoDB shines in its flexibility—serving as a central data storage solution for retrieving data from external financial institutions while seamlessly supporting diverse formats and structures.",
              },
            ],
          },
        ]}
      />

    </nav>
  );
};
export default NavigationBar;