import "./styles.css";
import React from "react";
import stepperImage from "../images/stepper2.png";

function Header() {
  return (
    <header className="header">
      <div className="stepper">
        <img className="stepper-img" id="stepper-img" src={stepperImage} alt="Leafy Factory Demo Architecture" />
      </div>
    </header>
  );
}

export default Header;
