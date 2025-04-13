import React from "react";
import { Table, Badge, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";
import "./MonthlyView.css"; // We'll create this CSS file for additional styling

const MonthlyView = ({ currentDate, tasks }) => {
  // Get all dates for the current month's calendar view
  const getDatesForMonth = () => {
    const dates = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Create date for first day of month
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();

    // Get number of days in month
    const lastDay = new Date(year, month + 1, 0);
    const monthLength = lastDay.getDate();

    // Create array with dates for previous month days showing in calendar
    for (let i = 0; i < startingDay; i++) {
      const prevMonthDay = new Date(year, month, -startingDay + i + 1);
      dates.push({ date: prevMonthDay, currentMonth: false });
    }

    // Add all days in current month
    for (let i = 1; i <= monthLength; i++) {
      const day = new Date(year, month, i);
      dates.push({ date: day, currentMonth: true });
    }

    // Fill out the remaining week with next month's days
    const remainingDays = 42 - dates.length; // 6 weeks * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(year, month + 1, i);
      dates.push({ date: nextMonthDay, currentMonth: false });
    }

    return dates;
  };

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
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

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { day: "numeric" });
  };

  // Format date for tooltip
  const formatDateForTooltip = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get priority badge variant
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "info";
      default:
        return "secondary";
    }
  };

  const monthDates = getDatesForMonth();

  // Chunk dates array into rows (weeks)
  const weeks = [];
  for (let i = 0; i < monthDates.length; i += 7) {
    weeks.push(monthDates.slice(i, i + 7));
  }

  return (
    <div className="monthly-view">
      <Card className="calendar-card">
        <Card.Body className="p-0">
          <Table responsive bordered className="calendar-table m-0">
            <thead>
              <tr className="bg-light">
                <th className="text-center day-header">Sun</th>
                <th className="text-center day-header">Mon</th>
                <th className="text-center day-header">Tue</th>
                <th className="text-center day-header">Wed</th>
                <th className="text-center day-header">Thu</th>
                <th className="text-center day-header">Fri</th>
                <th className="text-center day-header">Sat</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {week.map(({ date, currentMonth }, dayIndex) => {
                    const dailyTasks = getTasksForDate(date);
                    const isCurrentDay = isToday(date);

                    return (
                      <td
                        key={dayIndex}
                        className={`calendar-cell ${
                          !currentMonth ? "other-month" : "current-month"
                        } ${isCurrentDay ? "today" : ""}`}
                      >
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>{formatDateForTooltip(date)}</Tooltip>
                          }
                        >
                          <div
                            className={`date-container ${
                              isCurrentDay ? "today-circle" : ""
                            }`}
                          >
                            <span className="date-number">
                              {formatDate(date)}
                            </span>
                            {dailyTasks.length > 0 && (
                              <Badge
                                pill
                                bg="primary"
                                className="task-count-badge"
                              >
                                {dailyTasks.length}
                              </Badge>
                            )}
                          </div>
                        </OverlayTrigger>

                        <div className="tasks-container">
                          {dailyTasks.slice(0, 3).map((task) => (
                            <OverlayTrigger
                              key={task.id}
                              placement="auto"
                              overlay={
                                <Tooltip>
                                  <div>
                                    <strong>{task.name}</strong>
                                  </div>
                                  <div>{task.description}</div>
                                  <div>
                                    Due:{" "}
                                    {new Date(
                                      task.dueDate
                                    ).toLocaleDateString()}
                                  </div>
                                  <div>
                                    Status:{" "}
                                    {task.iscomplete ? "Complete" : "Pending"}
                                  </div>
                                </Tooltip>
                              }
                            >
                              <div
                                className={`task-item ${
                                  task.iscomplete ? "completed-task" : ""
                                }`}
                              >
                                <span className="task-name">{task.name}</span>
                                <Badge
                                  bg={getPriorityBadge(task.priority)}
                                  className="priority-badge"
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                            </OverlayTrigger>
                          ))}
                          {dailyTasks.length > 3 && (
                            <div className="more-tasks">
                              +{dailyTasks.length - 3} more
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

MonthlyView.propTypes = {
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

export default MonthlyView;
