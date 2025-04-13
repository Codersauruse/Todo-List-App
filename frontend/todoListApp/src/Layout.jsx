import PropTypes from "prop-types";
import Footer from "./Pages/Footer/Footer";
import Navbar from "./Components/Navbar/NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      {/* Main content container for routing */}
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
