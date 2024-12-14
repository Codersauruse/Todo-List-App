import { NavLink } from "react-router-dom";
import "./Dashboard.css"; // Optional: Add styles for the dashboard
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="mainboard d-flex mt-5">
      {/* Sidebar */}
      <nav className="sideNav d-flex flex-column p-3 bg-light border-end">
        <h4 className="mb-4">Hello Code</h4>
        <NavLink to="add-task" className="nav-link mb-2">
          Add Task
        </NavLink>
        <NavLink to="delete-task" className="nav-link mb-2">
          Today Tasks
        </NavLink>
        <NavLink to="view-task" className="nav-link mb-2">
          View Tasks
        </NavLink>
      </nav>

      {/* Main Content */}
      <div className="content flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
}

// path="/add-task" element={<AddTask />} />
//           <Route path="/delete-task" element={<DeleteTask />} />
//           <Route path="/view-task"
