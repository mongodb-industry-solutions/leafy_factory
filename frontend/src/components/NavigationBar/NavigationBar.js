"use client";
import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import Image from "next/image";

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">      
          Leafy Factory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="me-3">
              <Link href="/"></Link>
            </div>
            <div className ="me-3"><Link href="/">Work Orders</Link></div>
            <div className ="me-3"><Link href="/jobsorders">Jobs</Link></div>
            <div className ="me-3"><Link href="/start-simulation">Shopfloor Simulator</Link></div>
            {/*<div className ="me-3"><Link href="/overview">Demo Overview</Link></div>*/}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default NavigationBar;