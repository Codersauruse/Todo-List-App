import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    //desktop view navbar
    <Navbar fixed="top" bg="primary" data-bs-theme="dark" className="desktop">
      <Container fluid>
        <Navbar.Brand href="/">MytodoApp</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/features">
            Features
          </Nav.Link>
          <Nav.Link as={NavLink} to="/pricing">
            Pricing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            Signup
          </Nav.Link>
          <Nav.Link as={NavLink} to="/register">
            Join
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
