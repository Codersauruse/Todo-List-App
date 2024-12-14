import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavItem, NavLink } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router";
import userAtom from "../../utils/apiService/atoms/userAtom";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import Apiclient from "../../utils/apiService/ApiClient";

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
  const [isvalidated, setvalidate] = useState(false);

  const handleFormInput = (event) => {
    const { value, name } = event.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    for (let key in formInput) {
      if (formInput[key] === "") {
        toast.error("Please fill all input fields: " + key);

        return;
      }
    }

    setvalidate(true);
    setLoading(true);
    try {
      const { data } = await Apiclient.post("/login", formInput);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Welcome back!", {
        duration: 3000,
        icon: "😃",
      });
      navigate("/dashboard");
    } catch ({ response: { data } }) {
      setError(data.message);
      toast.error(data.message, {
        duration: 3000,
      });
    } finally {
      setLoading(false);
      setError(null);
    }
  }

  return (
    <>
      <div className="login-form p-4">
        <h3>Login</h3>
        <Form
          noValidate
          validated={isvalidated}
          onSubmit={handleSubmit}
          onChange={handleFormInput}
        >
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              className="p-2"
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              className="p-2"
            />
          </Form.Group>
          <br />

          <Button type="submit" className="p-2 mb-1">
            Login
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
          <NavItem>
            <NavLink>Forgot password ?</NavLink>
          </NavItem>
        </Nav>
      </div>
    </>
  );
}
