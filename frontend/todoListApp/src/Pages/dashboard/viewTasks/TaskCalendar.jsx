import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import {
  BsCalendar4Week,
  BsCalendar4,
  BsCalendarRange,
  BsChevronLeft,
  BsChevronRight,
  BsCalendarCheck,
  BsGear,
} from "react-icons/bs";
import WeeklyView from "./WeeklyView";
import MonthlyView from "./MonthlyView";
import YearlyView from "./YearlyView";
import "./TaskCalendar.css";

const TaskCalendar = ({ tasks }) => {
  const [view, setView] = useState("monthly"); // Default view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  // Handler for view change
  const handleViewChange = (newView) => {
    setView(newView);
    setCurrentDate(new Date()); // Reset to current date when changing views
  };

  // Navigate to previous period based on current view
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "weekly") {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === "monthly") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === "yearly") {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next period based on current view
  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === "weekly") {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === "monthly") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === "yearly") {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };

  // Go to current period
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Format the current period for display
  const formatCurrentPeriod = () => {
    if (view === "weekly") {
      // Get start and end date of the week
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const startMonth = startOfWeek.toLocaleString("default", {
        month: "short",
      });
      const endMonth = endOfWeek.toLocaleString("default", { month: "short" });

      // If start and end dates are in the same month
      if (startMonth === endMonth) {
        return `${startMonth} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
      } else {
        return `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
      }
    } else if (view === "monthly") {
      return `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${currentDate.getFullYear()}`;
    } else if (view === "yearly") {
      return currentDate.getFullYear().toString();
    }
    return "";
  };

  // Get the icon for the current view
  const getViewIcon = () => {
    switch (view) {
      case "weekly":
        return <BsCalendar4Week className="view-icon" />;
      case "monthly":
        return <BsCalendar4 className="view-icon" />;
      case "yearly":
        return <BsCalendarRange className="view-icon" />;
      default:
        return <BsCalendar4 className="view-icon" />;
    }
  };

  // Format task stats for the current view period
  const formatTaskStats = () => {
    let filteredTasks = [];
    const today = new Date();

    if (view === "weekly") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      filteredTasks = tasks.filter((task) => {
        const taskStart = new Date(task.startDate);
        const taskDue = new Date(task.dueDate);
        return taskDue >= startOfWeek && taskStart <= endOfWeek;
      });
    } else if (view === "monthly") {
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      filteredTasks = tasks.filter((task) => {
        const taskStart = new Date(task.startDate);
        const taskDue = new Date(task.dueDate);
        return taskDue >= startOfMonth && taskStart <= endOfMonth;
      });
    } else if (view === "yearly") {
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

      filteredTasks = tasks.filter((task) => {
        const taskStart = new Date(task.startDate);
        const taskDue = new Date(task.dueDate);
        return taskDue >= startOfYear && taskStart <= endOfYear;
      });
    }

    const completedTasks = filteredTasks.filter(
      (task) => task.iscomplete
    ).length;
    const totalTasks = filteredTasks.length;
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      total: totalTasks,
      completed: completedTasks,
      rate: completionRate,
    };
  };

  const stats = formatTaskStats();

  return (
    <Container fluid className="calendar-container py-4 bg-light">
      <Card className="main-calendar-card shadow border-0 rounded-3">
        <Card.Header className="calendar-header bg-gradient bg-primary text-white py-3">
          <Row className="align-items-center">
            <Col
              xs={12}
              md={6}
              className="d-flex align-items-center mb-3 mb-md-0"
            >
              <Button
                variant="outline-light"
                className="today-btn fw-bold me-2 rounded-pill"
                onClick={handleToday}
              >
                Today
              </Button>
              <ButtonGroup className="nav-btn-group me-3">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Previous {view}</Tooltip>}
                >
                  <Button
                    variant="outline-light"
                    className="nav-btn rounded-start"
                    onClick={handlePrevious}
                  >
                    <BsChevronLeft />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Next {view}</Tooltip>}
                >
                  <Button
                    variant="outline-light"
                    className="nav-btn rounded-end"
                    onClick={handleNext}
                  >
                    <BsChevronRight />
                  </Button>
                </OverlayTrigger>
              </ButtonGroup>
              <div className="period-display bg-primary-subtle text-primary fw-bold py-2 px-3 rounded-3 d-flex align-items-center">
                {getViewIcon()}
                <span className="period-text ms-2 fs-5">{formatCurrentPeriod()}</span>
              </div>
            </Col>

            <Col xs={12} md={6} className="d-flex justify-content-md-end">
              <div className="task-stats me-3 d-none d-md-flex align-items-center">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      {stats.completed} of {stats.total} tasks completed (
                      {stats.rate}%)
                    </Tooltip>
                  }
                >
                  <div className="d-flex align-items-center bg-light text-dark py-1 px-3 rounded-pill">
                    <BsCalendarCheck className="stats-icon text-success me-2" />
                    <span className="stats-text fw-bold">
                      <Badge bg="success" className="me-2">{stats.completed}</Badge>/
                      <Badge bg="secondary" className="ms-1">{stats.total}</Badge>
                    </span>
                    <div className="progress-container ms-2" style={{ width: '60px', height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${stats.rate}%`, height: '100%', borderRadius: '4px' }}
                      ></div>
                    </div>
                  </div>
                </OverlayTrigger>
              </div>

              <ButtonGroup className="view-btn-group border border-light rounded-3 shadow-sm">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Weekly view</Tooltip>}
                >
                  <Button
                    variant={view === "weekly" ? "primary" : "outline-light"}
                    className="view-btn"
                    onClick={() => handleViewChange("weekly")}
                  >
                    <BsCalendar4Week />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Monthly view</Tooltip>}
                >
                  <Button
                    variant={view === "monthly" ? "primary" : "outline-light"}
                    className="view-btn"
                    onClick={() => handleViewChange("monthly")}
                  >
                    <BsCalendar4 />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Yearly view</Tooltip>}
                >
                  <Button
                    variant={view === "yearly" ? "primary" : "outline-light"}
                    className="view-btn"
                    onClick={() => handleViewChange("yearly")}
                  >
                    <BsCalendarRange />
                  </Button>
                </OverlayTrigger>
              </ButtonGroup>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="calendar-body p-0 p-md-3 bg-white">
          <div className="calendar-view-container border border-light rounded-3 shadow-sm">
            {view === "weekly" && (
              <WeeklyView currentDate={currentDate} tasks={tasks} />
            )}
            {view === "monthly" && (
              <MonthlyView currentDate={currentDate} tasks={tasks} />
            )}
            {view === "yearly" && (
              <YearlyView currentDate={currentDate} tasks={tasks} />
            )}
          </div>
        </Card.Body>
        <Card.Footer className="bg-light text-end py-2 border-top">
          <Button variant="outline-secondary" size="sm" className="rounded-pill">
            <BsGear className="me-1" /> Settings
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

TaskCalendar.propTypes = {
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

export default TaskCalendar;