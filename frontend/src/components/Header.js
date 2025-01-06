//import "./styles.css";
import React from 'react';
//import LeafyProvider from '@leafygreen-ui/leafygreen-provider'
//import Stepper, { Step } from '@leafygreen-ui/stepper';

function Header() {
    return (
        <header className='header'>
            <h1>Welcome to Leafy Factory Work Order Process</h1>
            {/*<LeafyProvider>
            <div className="sandbox">
                <Stepper currentStep={0} maxDisplayedSteps={2}>
                <div>Step 1</div>
                <div>Step 2</div>
                </Stepper>
            </div>
            </LeafyProvider>*/}
            <img src="https://images.contentstack.io/v3/assets/blt7151619cb9560896/blta30d0168850404a8/65fda6758f44440029c3a12a/la1a1agcxt7ppntea-logo-marks.svg" className="logo" alt="logo" />
        </header>
    );
}

export default Header