import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar"; // Make sure Sidebar is imported correctly

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
