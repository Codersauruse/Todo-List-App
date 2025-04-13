import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";

const YearlyView = ({ currentDate, tasks }) => {
  const year = currentDate.getFullYear();

  // Get all months in the year
  const getMonthsInYear = () => {
    const months = [];

    for (let month = 0; month < 12; month++) {
      months.push({
        name: new Date(year, month, 1).toLocaleString("default", {
          month: "long",
        }),
        index: month,
      });
    }

    return months;
  };

  // Get number of tasks for a specific month
  const getTaskCountForMonth = (monthIndex) => {
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    return tasks.filter((task) => {
      const taskStart = new Date(task.startDate);
      const taskDue = new Date(task.dueDate);

      // Check if the task dates overlap with this month
      return taskDue >= startDate && taskStart <= endDate;
    }).length;
  };

  // Check if month is current month
  const isCurrentMonth = (monthIndex) => {
    const today = new Date();
    return today.getMonth() === monthIndex && today.getFullYear() === year;
  };

  // Get a brief calendar for the month (just showing dates, no tasks)
  const getMonthCalendar = (monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendar = [];
    let day = 1;

    // Create 6 weeks
    for (let week = 0; week < 6 && day <= daysInMonth; week++) {
      const weekDays = [];

      // Create 7 days per week
      for (let i = 0; i < 7; i++) {
        if ((week === 0 && i < startingDay) || day > daysInMonth) {
          weekDays.push(null); // Empty cell
        } else {
          weekDays.push(day++);
        }
      }

      calendar.push(weekDays);
    }

    return calendar;
  };

  const months = getMonthsInYear();

  return (
    <div className="yearly-view">
      <Row>
        {months.map(({ name, index }) => (
          <Col md={3} key={index} className="mb-3">
            <Card className={isCurrentMonth(index) ? "border-primary" : ""}>
              <Card.Header className="d-flex justify-content-between">
                <span className="fw-bold">{name}</span>
                <span>Tasks: {getTaskCountForMonth(index)}</span>
              </Card.Header>
              <Card.Body>
                <table className="w-100" style={{ fontSize: "0.7rem" }}>
                  <thead>
                    <tr>
                      <th className="text-center">S</th>
                      <th className="text-center">M</th>
                      <th className="text-center">T</th>
                      <th className="text-center">W</th>
                      <th className="text-center">T</th>
                      <th className="text-center">F</th>
                      <th className="text-center">S</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getMonthCalendar(index).map((week, weekIndex) => (
                      <tr key={weekIndex}>
                        {week.map((day, dayIndex) => {
                          const isToday =
                            day &&
                            new Date().getDate() === day &&
                            new Date().getMonth() === index &&
                            new Date().getFullYear() === year;

                          return (
                            <td key={dayIndex} className="text-center">
                              {day && (
                                <span
                                  className={`${
                                    isToday
                                      ? "bg-info rounded-circle d-inline-block"
                                      : ""
                                  }`}
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    lineHeight: "20px",
                                  }}
                                >
                                  {day}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
YearlyView.propTypes = {
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
export default YearlyView;
