import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-gradient-dark text-light py-5 mt-auto"
      style={{ background: "linear-gradient(45deg, #1a1a1a, #303030)" }}
    >
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="mb-3 text-primary fw-bold">My Website</h5>
            <p className="text-light-50 mb-0">
              Creating amazing digital experiences with passion and precision.
            </p>
          </div>
          <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
            <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-light-50 hover-text-primary"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-light-50 hover-text-primary"
                >
                  About
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-light-50 hover-text-primary"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none text-light-50 hover-text-primary"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
            <h6 className="text-uppercase fw-bold mb-3">Connect</h6>
            <div className="d-flex gap-3 mb-4">
              <a
                href="#"
                className="btn btn-outline-light btn-sm rounded-circle p-2"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="#"
                className="btn btn-outline-light btn-sm rounded-circle p-2"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="#"
                className="btn btn-outline-light btn-sm rounded-circle p-2"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="#"
                className="btn btn-outline-light btn-sm rounded-circle p-2"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-2">
            <h6 className="text-uppercase fw-bold mb-3">Subscribe</h6>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Email address"
                aria-label="Email address"
              />
              <button className="btn btn-primary btn-sm" type="button">
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4 bg-secondary" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <span className="fw-bold me-2">Made with</span>
              <span className="text-danger">
                <i className="bi bi-heart-fill"></i>
              </span>
              <span className="fw-bold ms-2">by Code</span>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <small className="text-muted">
              © {new Date().getFullYear()} My Website. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
