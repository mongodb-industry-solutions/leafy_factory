import React from "react";
import navImage from "../images/factory.png";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
//import ArchOverview from "./Overview";
//import Factory from "./Factory";

function Navbar() {
  const navigate = useNavigate();
  const handleTabSelector = key => {
    navigate(`/${key}`);
  };

  return (
    <nav className="navbar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          id="nav-img"
          src={navImage}
          alt="Leafy Factory Logo"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <h1 className="navtext">Leafy Factory</h1>
      </div>

      <div className="w-100 d-flex justify-content-center mt-3">
        <Tabs
          id="navbar-tabs"
          onSelect={handleTabSelector}
          className="mb-3"
          justify
        >
          <Tab eventKey="workorders" title="Work Orders" />
          <Tab eventKey="jobs" title="Jobs" />
          <Tab eventKey="shopfloor" title="Shopfloor Simulator" disabled />
          <Tab eventKey="overview" title="Demo Overview" />
        </Tabs>
      </div>
    </nav>
  );
}

export default Navbar;
