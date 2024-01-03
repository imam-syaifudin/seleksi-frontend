import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

function Navigation({ children }) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUserIdent = async () => {
    setLoading(true);
    await axios
      .get("http://127.0.0.1:9001/api/users/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(true);
        console.log(e);
      });
  };

  const logoutHandler = async () => {
    await localStorage.removeItem('token');
    navigate('/login');
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    getUserIdent();
    // logoutHandler();
  }, []);

  return (
    <div>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#212529" }}
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand
            href="#home"
            className="text-light"
            style={{ fontSize: "25px" }}
          >
            Lara<span className="text-warning">React</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ backgroundColor: "white" }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-light p-2">
              <Nav.Link
                as={NavLink}
                to="/home"
                className="btn btn-warning mx-1 px-4 shadow-sm mt-1"
                style={{ borderRadius: "20px" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/about"
                className="btn btn-warning mx-1 px-4 shadow-sm mt-1"
                style={{ borderRadius: "20px" }}
              >
                About
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/player"
                className="btn btn-warning mx-1 px-4 shadow-sm mt-1"
                style={{ borderRadius: "20px" }}
              >
                Player
              </Nav.Link>
              {loading ? (
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                 Loading
              </Dropdown.Toggle>
              ) : (
                <Dropdown
                  className="mx-1 text-center"
                  style={{ paddingTop: "6px" }}
                >
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to='/profile'>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </div>
  );
}

export default Navigation;
