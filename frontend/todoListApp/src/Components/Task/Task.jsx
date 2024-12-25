import Checkbox from "@mui/material/Checkbox";
import "./Task.css";

export default function Task({ name }) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="task d-flex flex-row justify-content-between align-items-center">
      <div className="task-name">
        <p>{name}</p>
      </div>
      <div className="check-box">
        <Checkbox {...label} defaultChecked color="success" />
      </div>

      {/* Add more tasks here if needed */}
    </div>
  );
}
