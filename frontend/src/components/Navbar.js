import React, { useState} from "react";
import navImage from "../images/factory.png";
//import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import ArchOverview from './Overview'; 
import Factory from './Factory';


function Navbar() {
    const [key, setKey] = useState('workorders'); // Manage active tab state

    return (
        <nav className="navbar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img id="nav-img" src={navImage} alt="Leafy Factory Logo" style={{ height: '50px', marginRight: '10px' }} />
            <h1 className="navtext">Leafy Factory</h1>
          </div>
    
          <div className="w-100 d-flex justify-content-center mt-3">
            <Tabs
              id="navbar-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)} 
              className="mb-3"
              justify
            >
              <Tab eventKey="workorders" title="Work Orders">
                <Factory />
              </Tab>
              <Tab eventKey="jobs" title="Jobs">
                <h3>Jobs Tab</h3>
              </Tab>
              <Tab eventKey="shopfloor" title="Shopfloor Simulator" disabled>
                <span>Shopfloor Simulator (Disabled)</span>
              </Tab>
              <Tab eventKey="overview" title="Demo Overview">
                <ArchOverview />
              </Tab>
            </Tabs>
          </div>
        </nav>
      );
}

export default Navbar;
