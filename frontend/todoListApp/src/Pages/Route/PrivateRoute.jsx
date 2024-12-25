import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { pathname } = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node and is required
};
