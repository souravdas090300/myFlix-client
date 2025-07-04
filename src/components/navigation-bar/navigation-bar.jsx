import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">
        myFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Movies
          </Nav.Link>
          {user && (
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          )}
        </Nav>
        {user && (
          <Button variant="outline-light" onClick={onLoggedOut}>
            Logout
          </Button>
        )}
      </Navbar.Collapse>
      </Container>
  </Navbar>
);