import { Routes, Route } from "react-router-dom";
import Layout from "../../Layout";
import Home from "../Home/Home";
import Features from "../Features/Features";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dashboard from "../dashboard/Dashboard";
import AddTask from "../dashboard/AddTask/AddTask";
import DailyTasks from "../dashboard/ViewDailyTasks/DailyTasks";
import ViewTasks from "../dashboard/viewTasks/ViewTasks";
import PrivateRoute from "./PrivateRoute";
import TodoAppPage from "../Appdetails/TodoAppPage";
import ManageTask from "../dashboard/ManageTasks/ManageTask";

export default function AppRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Routes for general users */}
        <Route index element={<Home />} />
        <Route path="details" element={<TodoAppPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="add-task" element={<AddTask />} />
          <Route path="daily-tasks" element={<DailyTasks />} />
          <Route path="view-task" element={<ViewTasks />} />
          <Route path="manage-task" element={<ManageTask />} />
        </Route>
      </Route>
    </Routes>
  );
}
