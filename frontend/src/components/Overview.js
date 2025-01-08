import './styles.css'
import React from "react";
import demoImage from '../images/demoOverview.png';

function ArchOverview () {
    return (
        <div className="overview">
            <div className="img-container">
                <img 
                    className="overview-img" 
                    id="overview-img" 
                    src={demoImage} 
                    alt="Leafy Factory Demo Architecture" 
                />
            </div>
        </div>
    );
}

export default ArchOverview;
