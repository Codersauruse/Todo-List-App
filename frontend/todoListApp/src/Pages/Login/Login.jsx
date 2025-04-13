import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavItem, NavLink, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { userAtom } from "../../utils/Atoms/userAtom";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import AuthService from "../../services/auth-service";
import "./Login.css";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formInput, setFormInput] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const handleFormInput = (event) => {
    const { value, name } = event.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!formInput.email.trim()) {
      toast.error("email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formInput.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!formInput.password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (formInput.password.length < 4 || formInput.password.length > 10) {
      toast.error("Password must be between 4 and 10 characters");
      return;
    }

    setLoading(true);
    try {
      const userData = await AuthService.login(
        formInput.email,
        formInput.password
      );
      setUser(userData);
      navigate("/dashboard/daily-tasks");
      toast.success(`Welcome back, ${userData.username}!`);
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={5} xl={4}>
          <div className="login-form p-4 border rounded bg-white shadow-sm">
            <h3 className="text-center mb-4">Login</h3>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  required
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your username"
                  className="p-2 mb-3"
                  value={formInput.email}
                  onChange={handleFormInput}
                  aria-label="Username"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  required
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="p-2 mb-3"
                  value={formInput.password}
                  onChange={handleFormInput}
                  aria-label="Password"
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <Button
                type="submit"
                className="w-100 p-2 mb-3"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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
                    Login with GitHub
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/forgot-password" className="text-primary">
                    Forgot password?
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
