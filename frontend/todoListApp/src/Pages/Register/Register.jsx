import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavItem, NavLink } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import authService from "../../services/auth-service"; // Import your authService
import "./Register.css";

const initialFormData = {
  username: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = formData;

    // Validation logic remains the same

    try {
      setIsSubmitting(true);
      await authService.register(username, null, password);
      toast.success("Registration successful!");
      setFormData(initialFormData); // Reset form
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-form p-4">
      <h3>Register</h3>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            required
            type="text"
            name="username"
            placeholder="Username"
            className="p-2"
            value={formData.username}
            onChange={handleChange}
            aria-label="Username"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="Password"
            className="p-2"
            value={formData.password}
            onChange={handleChange}
            aria-label="Password"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="p-2"
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-label="Confirm Password"
          />
        </Form.Group>
        <br />
        <Button type="submit" className="p-2 mb-1" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </Form>
      <h4>OR</h4>
      <Nav className="flex-column">
        <NavItem>
          <NavLink href="/auth/google" className="text-success">
            Login with Google
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/auth/github" className="text-dark">
            Login with Github
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
