import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavItem, NavLink } from "react-bootstrap";
import "./Register.css";

export default function Register() {
  const [isvalidated, setvalidate] = useState(false);
  const [formData, setDetails] = useState({
    name: "",
    password: "",
  });
  const [errMessage, setMessage] = useState("");

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // if (formData.name < 5) {
    //   setMessage("username must be 10 character length");
    // } else {
    //   setMessage("username ok");
    // }

    // if (formData.password < 5) {
    //   setMessage("password must be 10 character length");
    // } else {
    //   setMessage("password ok");
    // }
    setvalidate(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails({ ...formData, [name]: value });
  }
  return (
    <>
      <div className="register-form p-4">
        <h3>Register</h3>
        <Form
          noValidate
          validated={isvalidated}
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              className="p-2"
            />
            <Form.Control.Feedback type="valid">
              {errMessage}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              className="p-2"
            />
            <Form.Control.Feedback type="valid">
              {errMessage}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Control
            required
            type="password"
            placeholder="Retype Password"
            className="p-2"
          />
          <br />
          <Button type="submit" className="p-2 mb-1">
            Register
          </Button>
        </Form>
        <h4>OR</h4>
        <Nav className="flex-column">
          <NavItem>
            <NavLink style={{ color: "green" }}>Login with Google</NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{ color: "black" }}>Login with Github</NavLink>
          </NavItem>
        </Nav>
      </div>
    </>
  );
}
