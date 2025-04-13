import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useRecoilState } from "recoil";
import { isOpenState, userAtom } from "../../utils/Atoms/userAtom";
import "./NavBar.css";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <Navbar
      fixed="top"
      variant="dark"
      expand="lg"
      className="bg-primary desktop"
    >
      {user && (
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          edge="start"
          aria-label="menu"
          className="menu-button"
        >
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>
      )}

      {!user ? (
        <Navbar.Brand href="/" className="title">
          MyTodoApp
        </Navbar.Brand>
      ) : (
        <></>
      )}
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/" key="home">
          Home
        </Nav.Link>

        <Nav.Link as={Link} to="/details" key="pricing">
          About
        </Nav.Link>

        {!user ? (
          <>
            <Nav.Link as={Link} to="/login" key="login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" key="register">
              Sign Up
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/dashboard/daily-tasks" key="dashboard">
              Dashboard
            </Nav.Link>
            <Button variant="outline-light" onClick={handleLogout} key="logout">
              Logout
            </Button>
          </>
        )}
      </Nav>
    </Navbar>
  );
}
