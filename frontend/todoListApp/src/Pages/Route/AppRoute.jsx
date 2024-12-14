import { Routes, Route } from "react-router-dom";
import Layout from "../../Layout";
import Home from "../Home/Home";
import Features from "../Features/Features";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AuthRoute from "../AuthRoute/AuthRoute";
import Dashboard from "../dashboard/Dashboard";
import AddTask from "../dashboard/AddTask/AddTask";
import DeleteTask from "../dashboard/deleteTasks/DeleteTask";
import ViewTasks from "../dashboard/viewTasks/ViewTasks";

export default function AppRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Routes for general users */}
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="add-task" element={<AddTask />} />
          <Route path="delete-task" element={<DeleteTask />} />
          <Route path="view-task" element={<ViewTasks />} />
        </Route>
      </Route>
    </Routes>
  );
}
