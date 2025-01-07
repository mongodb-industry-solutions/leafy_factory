import React from "react";
import { Link } from "react-router-dom";
import demoImage from '../images/demoOverview.png';

function ArchOverview () {
    return(
        <div className="overview">
            <Link exact to="/overview"/>
            
            <div className="img-container">
                <img className="overview-img" id="overview-img" src={demoImage} alt="Leafy Factory Demo Architecture" />
            </div>
        </div>
    );
}

export default ArchOverview;
