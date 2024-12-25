import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavItem, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router";
import { userAtom, isOpenState } from "../../utils/Atoms/userAtom";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import AuthService from "../../services/auth-service"; // Import AuthService
import "./Login.css";

const initialState = {
  username: "",
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

    // Validate input fields
    if (!formInput.username.trim()) {
      toast.error("Username is required");
      return;
    }
    if (formInput.username.length < 4 || formInput.username.length > 20) {
      toast.error("Username must be between 4 and 20 characters");
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
        formInput.username,
        formInput.password
      ); // Use AuthService
      setUser(userData); // Update Recoil state
      toast.success(`Welcome back, ${userData.username}!`);
      navigate("/dashboard");
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form p-4">
      <h3>Login</h3>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            required
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="p-2"
            value={formInput.username}
            onChange={handleFormInput}
            aria-label="Username"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            required
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="p-2"
            value={formInput.password}
            onChange={handleFormInput}
            aria-label="Password"
          />
        </Form.Group>
        <br />
        {error && <p className="text-danger">{error}</p>}
        <Button type="submit" className="p-2 mb-1" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
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
  );
}
