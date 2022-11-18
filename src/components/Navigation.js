import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";

function Navigation({children}) {


  return (
    <div>
     <Navbar expand="lg" style={{ backgroundColor: '#212529' }} className="shadow-sm"> 
      <Container>
        <Navbar.Brand href="#home" className="text-light" style={{ fontSize: '25px' }}>Data<span className="text-warning">Players</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'white' }}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-light p-2">
            <Nav.Link as={NavLink} to="/home" className="btn btn-warning mx-1 px-4 shadow-sm mt-1" style={{ borderRadius: "20px"  }}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="btn btn-warning mx-1 px-4 shadow-sm mt-1" style={{ borderRadius: "20px"  }}>About</Nav.Link>
            <Nav.Link as={NavLink} to="/player" className="btn btn-warning mx-1 px-4 shadow-sm mt-1" style={{ borderRadius: "20px"  }}>Player</Nav.Link>
            <Nav.Link as={NavLink} to="/profile" className="btn btn-warning mx-1 px-4 shadow-sm mt-1" style={{ borderRadius: "20px"  }}>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {children}
    </div>
  );
}

export default Navigation;
