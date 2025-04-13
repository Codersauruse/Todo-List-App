import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavItem, NavLink, Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import authService from "../../services/auth-service";
import "./Register.css";

const initialFormData = {
  username: "",
  email: "",
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
    const { username, email, password, confirmPassword } = formData;

    // ✅ Frontend validation
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // ✅ Proceed to backend registration
    try {
      setIsSubmitting(true);
      await authService.register(username, email, password);
      toast.success("Registration successful!");
      setFormData(initialFormData);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row
        className="w-100 justify-content-center"
        style={{ maxWidth: "700px" }}
      >
        <Col xs={12} md={8} lg={6}>
          <div className="register-form p-4 border rounded bg-white shadow-sm">
            <h3 className="text-center mb-4">Register</h3>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  required
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="p-2 mb-3"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-2 mb-3"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-2 mb-3"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  required
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="p-2 mb-3"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 p-2 mb-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </Form>
            <div className="text-center">
              <h5 className="my-3">OR</h5>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}
