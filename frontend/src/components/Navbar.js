import React from 'react';
import navImage from '../images/factory.png';
import { Link,} from 'react-router-dom';
//import { BrowserRouter as Router } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
        {/*<Routes>*/}
        <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img id="nav-img" src={navImage} alt="Leafy Factory Logo" />
                <h1 className="navtext">Leafy Factory</h1>
          </Link>
        </div>

        <div className="navbar-overview">
            <Link to="/overview" className="overview-link">Demo Overview</Link>
        </div>
        {/*</Routes>*/}
        </nav>
  );
}

export default Navbar;
