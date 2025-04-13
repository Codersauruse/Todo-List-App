import { useNavigate } from "react-router";
import img1 from "/assets/img1.svg";
import img2 from "/assets/img2.svg";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-vh-100 d-flex flex-column bg-white">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#">
            TaskFlow
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
              <li className="nav-item ms-lg-3">
                <a className="btn btn-primary rounded-pill px-4" href="#">
                  Sign Up Free
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <h6 className="text-primary fw-bold mb-3 text-uppercase">
                  Task Management Simplified
                </h6>
                <h1 className="display-4 fw-bold mb-4 lh-sm">
                  Organize Your Tasks with Elegant Simplicity
                </h1>
                <p className="lead text-secondary mb-5">
                  Streamline your workflow, prioritize effectively, and
                  accomplish more with our intuitive task management solution
                  designed for professionals.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-primary btn-lg rounded-pill px-4 py-3 fw-medium"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Get Started
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-lg rounded-pill px-4 py-3"
                    onClick={() => {
                      navigate("/details");
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="position-relative">
                <div
                  className="position-absolute top-0 start-0 translate-middle bg-primary rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    opacity: "0.1",
                    zIndex: "-1",
                  }}
                ></div>
                <div
                  className="position-absolute bottom-0 end-0 translate-middle bg-warning rounded-circle"
                  style={{
                    width: "160px",
                    height: "160px",
                    opacity: "0.1",
                    zIndex: "-1",
                  }}
                ></div>
                <img
                  src={img1}
                  alt="Task Management Dashboard"
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ maxHeight: "450px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center">
              <h6 className="text-primary fw-bold mb-3 text-uppercase">
                Why Choose Us
              </h6>
              <h2 className="display-5 fw-bold mb-4">
                Powerful Features for Efficient Task Management
              </h2>
              <p className="lead text-secondary">
                Our solution provides all the tools you need to stay organized,
                focused, and productive.
              </p>
            </div>
          </div>

          <div className="row align-items-center gx-5">
            <div className="col-lg-6 order-lg-2 mb-5 mb-lg-0">
              <div className="ps-lg-5">
                <ul className="list-unstyled">
                  <li className="d-flex p-4 shadow-sm rounded-4 mb-4 bg-white border">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-4 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-cloud-check"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2">Seamless Synchronization</h5>
                      <p className="mb-0 text-secondary">
                        Your data is securely synchronized and accessible from
                        anywhere, ensuring you never miss an important task or
                        deadline.
                      </p>
                    </div>
                  </li>
                  <li className="d-flex p-4 shadow-sm rounded-4 mb-4 bg-white border">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-4 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-kanban"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11z" />
                        <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2">Intelligent Organization</h5>
                      <p className="mb-0 text-secondary">
                        Organize tasks with custom categories, priorities, and
                        deadlines to create a workflow that perfectly matches
                        how you work.
                      </p>
                    </div>
                  </li>
                  <li className="d-flex p-4 shadow-sm rounded-4 mb-4 bg-white border">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-4 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-graph-up-arrow"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2">Productivity Insights</h5>
                      <p className="mb-0 text-secondary">
                        Gain valuable insights into your productivity patterns
                        with beautiful analytics that help you optimize your
                        time management.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="text-center text-lg-start mt-5">
                  <a
                    href="#"
                    className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-medium"
                  >
                    Explore All Features
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="position-relative">
                <div
                  className="position-absolute bottom-0 start-0 translate-middle-x bg-secondary rounded-circle"
                  style={{
                    width: "140px",
                    height: "140px",
                    opacity: "0.1",
                    zIndex: "-1",
                  }}
                ></div>
                <img
                  src={img2}
                  alt="Feature Illustration"
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary bg-opacity-10">
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">
                Ready to Simplify Your Task Management?
              </h2>
              <p className="lead mb-5">
                Join thousands of professionals who have transformed their
                productivity with our solutions.
              </p>
              <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-medium">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
