import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const user = useAuth();
  // console.log(user);
  const { pathname } = useLocation();

  return user.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node and is required
};
