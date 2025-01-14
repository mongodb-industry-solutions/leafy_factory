import "./styles.css";
import React from "react";
import demoImage from "../images/demoOverview.png";
import { Card } from "react-bootstrap";

function ArchOverview() {
  return (
    <div className="overview">
        <h2 className="history-header">Demo's Architecture Overview</h2>
        <Card className="card">
        <Card.Body>
        <h5 className="card-body">The unified namespace model exemplified here serves as a single source
        of truth, consolidating data for operational efficiency and aligning
        manufacturing operations with business objectives. The leafy factory is
        built up on three data sources. Shop floor, MES and ERP The goal of the
        demo is to show how data from various sources and connecting
        technologies can be processed and aggregated by MongoDB as the central
        data repository and single source of truth. A data consuming application
        shows then the benefit of having such a central data repository by
        making use of the originally siloed data from ERP, MES and the
        shopfloor.</h5>
        </Card.Body>
        </Card>
      <div className="img-container">
        <img className="overview-img" id="overview-img" src={demoImage} alt="Leafy Factory Demo Architecture"/>
      </div>

    </div>
  );
}

export default ArchOverview;
