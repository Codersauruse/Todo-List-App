import React from "react";
import { Table, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
const WeeklyView = ({ currentDate, tasks }) => {
  // Get dates for the current week
  const getDatesForCurrentWeek = () => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];

    return tasks.filter((task) => {
      const taskStart = new Date(task.startDate);
      const taskDue = new Date(task.dueDate);

      // Check if the date is between startDate and dueDate (inclusive)
      return (
        date >= new Date(taskStart.setHours(0, 0, 0, 0)) &&
        date <= new Date(taskDue.setHours(23, 59, 59, 999))
      );
    });
  };

  // Format time for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const weekDates = getDatesForCurrentWeek();

  return (
    <div className="weekly-view">
      <Table bordered responsive>
        <thead>
          <tr>
            {weekDates.map((date, index) => (
              <th
                key={index}
                className={`text-center ${isToday(date) ? "bg-light" : ""}`}
              >
                {formatDate(date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekDates.map((date, index) => {
              const dailyTasks = getTasksForDate(date);

              return (
                <td
                  key={index}
                  className={`align-top ${isToday(date) ? "bg-light" : ""}`}
                  style={{ height: "150px", overflowY: "auto" }}
                >
                  {dailyTasks.length > 0 ? (
                    <div>
                      {dailyTasks.map((task) => (
                        <div key={task.id} className="mb-2">
                          <div className="task-item p-1 border rounded">
                            <div className="fw-bold">{task.name}</div>
                            <Badge
                              bg={
                                task.priority === "High"
                                  ? "danger"
                                  : task.priority === "Medium"
                                  ? "warning"
                                  : "info"
                              }
                            >
                              {task.priority}
                            </Badge>
                            {task.iscomplete && (
                              <Badge bg="success" className="ms-1">
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted text-center">No tasks</div>
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

WeeklyView.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      priority: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      iscomplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default WeeklyView;
