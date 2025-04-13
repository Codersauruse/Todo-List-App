import { useState } from "react";

export default function TodoAppPage() {
  // State for demonstration of the sample todo list
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete assignment", completed: false },
    { id: 2, text: "Study for exam", completed: true },
    { id: 3, text: "Meet project team", completed: false },
  ]);

  // Demo task toggle function
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            MyToDoList
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
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#demo">
                  Demo
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-light py-5">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className="my-5">
                <h1 className="display-5 fw-bold mb-2">MyToDoList App</h1>
                <p className="lead mb-4">
                  A simple, efficient, and user-friendly to-do list application
                  for managing your daily tasks and increasing productivity.
                </p>
                <div className="d-grid gap-3 d-sm-flex">
                  <a
                    className="btn btn-primary btn-lg px-4 me-sm-3"
                    href="#demo"
                  >
                    Try Demo
                  </a>
                  <a
                    className="btn btn-outline-dark btn-lg px-4"
                    href="#features"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <img
                className="img-fluid rounded-3 my-5"
                src="/api/placeholder/600/400"
                alt="Todo List App Screenshot"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-5" id="features">
        <div className="container px-5">
          <h2 className="fw-bold mb-4">Key Features</h2>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4">
                  <div className="badge bg-primary bg-gradient rounded-pill mb-2">
                    Core
                  </div>
                  <div className="text-center mb-3">
                    <i className="bi bi-list-check text-primary fs-1"></i>
                  </div>
                  <h5 className="card-title mb-3">Task Management</h5>
                  <p className="card-text mb-0">
                    Create, edit, and delete tasks effortlessly. Mark tasks as
                    complete with a simple click.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4">
                  <div className="badge bg-primary bg-gradient rounded-pill mb-2">
                    Essential
                  </div>
                  <div className="text-center mb-3">
                    <i className="bi bi-calendar-check text-primary fs-1"></i>
                  </div>
                  <h5 className="card-title mb-3">Due Dates & Reminders</h5>
                  <p className="card-text mb-0">
                    Set due dates for tasks and receive reminders to ensure you
                    never miss a deadline.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4">
                  <div className="badge bg-primary bg-gradient rounded-pill mb-2">
                    Advanced
                  </div>
                  <div className="text-center mb-3">
                    <i className="bi bi-tags text-primary fs-1"></i>
                  </div>
                  <h5 className="card-title mb-3">Categories & Tags</h5>
                  <p className="card-text mb-0">
                    Organize tasks using categories and tags for efficient
                    management and filtering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-5 bg-light" id="demo">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-4">Try the Demo</h2>
              <div className="card shadow">
                <div className="card-body p-4">
                  {/* Sample Todo List */}
                  <div className="mb-4">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a new task..."
                      />
                      <button className="btn btn-primary">Add</button>
                    </div>
                  </div>
                  <ul className="list-group">
                    {tasks.map((task) => (
                      <li
                        key={task.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                          />
                          <span
                            style={{
                              textDecoration: task.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {task.text}
                          </span>
                        </div>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Information Section */}
      <section className="py-5" id="about">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h2 className="fw-bold">About the Developer</h2>
                <p className="lead">Meet the mind behind MyToDoList</p>
              </div>
            </div>
          </div>
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0 text-center">
              <img
                className="rounded-circle img-fluid mb-4"
                src="/api/placeholder/200/200"
                alt="Shehan profile"
              />
            </div>
            <div className="col-lg-8">
              <h3 className="mb-3">Shehan</h3>
              <h5 className="text-primary mb-4">Aspiring Java Developer</h5>

              <p>
                I am an undergraduate student pursuing a degree in Computer
                Science at the University of Ruhuna, Sri Lanka. My passion lies
                in developing efficient and user-friendly applications that
                solve real-world problems.
              </p>

              <div className="mb-4">
                <h6 className="fw-bold">Education:</h6>
                <p>
                  BSc in Computer Science (Undergraduate)
                  <br />
                  University of Ruhuna
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">Skills:</h6>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-primary">Java</span>
                  <span className="badge bg-primary">Spring Boot</span>
                  <span className="badge bg-primary">React</span>
                  <span className="badge bg-primary">HTML/CSS</span>
                  <span className="badge bg-primary">JavaScript</span>
                  <span className="badge bg-primary">MySQL</span>
                  <span className="badge bg-primary">Git</span>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">Connect with me:</h6>
                <div className="d-flex gap-3">
                  <a href="#" className="text-decoration-none">
                    <i className="bi bi-github fs-4"></i>
                  </a>
                  <a href="#" className="text-decoration-none">
                    <i className="bi bi-linkedin fs-4"></i>
                  </a>
                  <a href="#" className="text-decoration-none">
                    <i className="bi bi-envelope-fill fs-4"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
