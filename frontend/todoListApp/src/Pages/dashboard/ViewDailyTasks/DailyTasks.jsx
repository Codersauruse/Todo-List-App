import { useEffect, useState } from "react";
import TaskService from "../../../services/task-service";
import { useAuth } from "../../Route/AuthContext";
import {
  Card,
  Badge,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import {
  CalendarCheck,
  ArrowRight,
  Clock,
  CheckCircle,
  Check,
  Calendar3,
  ExclamationTriangle,
  Lightning,
} from "react-bootstrap-icons";
import toast from "react-hot-toast";

export default function DailyTasks() {
  const Authuser = useAuth();
  const user = Authuser?.user;
  const userid = user?.id;
  const [myList, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  useEffect(() => {
    async function fetchDailyTasks() {
      try {
        const res = await TaskService.getDailyTasks(userid);
        setList(res);
        console.log(res);
      } catch (error) {
        console.error("Error fetching daily tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDailyTasks();
  }, [userid, myList.length]);

  // Function to mark task as complete
  const markAsComplete = async (taskId) => {
    try {
      // Assuming there's a service method to update task status
      // await TaskService.markTaskComplete(taskId);
      const response = await TaskService.updateStatus(taskId);
      toast.success(response.data);

      setList((prevList) =>
        prevList.map((task) =>
          task.id === taskId ? { ...task, iscomplete: true } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  const totalPages = Math.ceil(myList.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = myList.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to format date nicely
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get priority icon
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return <Lightning className="text-danger" />;
      case "Medium":
        return <ExclamationTriangle className="text-warning" />;
      default:
        return <ArrowRight className="text-secondary" />;
    }
  };

  // Function to get days remaining
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} left`;
  };

  return (
    <Container className="py-4" style={{ marginTop: "80px" }}>
      <div className="position-relative mb-5 text-center">
        <div className="d-inline-block position-relative">
          <h2 className="fw-bold display-6 position-relative z-1">
            <span className="text-primary">Daily Tasks</span>
          </h2>
          <div
            className="position-absolute bg-primary opacity-10 rounded-pill"
            style={{
              width: "110%",
              height: "10%",
              bottom: "5px",
              left: "-5%",
              zIndex: "0",
            }}
          ></div>
        </div>
        <p className="text-muted mt-2">Focus on what matters today</p>
      </div>

      {isLoading ? (
        <div className="text-center my-5 py-5">
          <Spinner
            animation="border"
            variant="primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading your tasks...</p>
        </div>
      ) : myList.length === 0 ? (
        <div className="text-center my-5 p-5 bg-light rounded-4 shadow-sm">
          <CalendarCheck size={48} className="text-primary mb-3 opacity-75" />
          <h4 className="text-secondary">Your schedule is clear!</h4>
          <p className="text-muted">
            No tasks scheduled for today. Time for something new?
          </p>
        </div>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col md={10} lg={8} xl={7}>
              {currentTasks.map((task, index) => (
                <Card
                  key={task.id}
                  className={`mb-4 border-2 shadow-sm position-relative overflow-hidden ${
                    task.iscomplete ? "bg-light" : "bg-white"
                  }`}
                  style={{ borderRadius: "12px" }}
                >
                  {/* Left accent border based on priority */}
                  <div
                    className={`position-absolute h-100 top-0 start-0`}
                    style={{
                      width: "5px",
                      backgroundColor:
                        task.priority === "High"
                          ? "#dc3545"
                          : task.priority === "Medium"
                          ? "#ffc107"
                          : "#6c757d",
                    }}
                  ></div>

                  <Card.Body className="py-3 ps-4 pe-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex align-items-center mb-2">
                        <div className="me-2">
                          {getPriorityIcon(task.priority)}
                        </div>
                        <h5
                          className={`mb-0 fw-bold ${
                            task.iscomplete
                              ? "text-decoration-line-through text-muted"
                              : ""
                          }`}
                        >
                          {task.name}
                        </h5>
                      </div>

                      {!task.iscomplete && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{
                            width: "28px",
                            height: "28px",
                            minWidth: "28px",
                          }}
                          onClick={() => markAsComplete(task.id)}
                          title="Mark as complete"
                        >
                          <Check size={16} />
                        </Button>
                      )}
                    </div>

                    <p
                      className={`text-secondary mb-3 ps-4 ${
                        task.iscomplete
                          ? "text-decoration-line-through opacity-50"
                          : ""
                      }`}
                      style={{ fontSize: "0.9rem" }}
                    >
                      {task.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center ps-4">
                      <div className="d-flex gap-3">
                        <div
                          className="d-flex align-items-center"
                          style={{ fontSize: "0.8rem" }}
                        >
                          <Calendar3 size={12} className="me-1 text-primary" />
                          <span className="text-muted">
                            {formatDate(task.startDate)}
                          </span>
                          <ArrowRight size={12} className="mx-1 text-muted" />
                          <span className="text-muted">
                            {formatDate(task.dueDate)}
                          </span>
                        </div>

                        <Badge
                          bg={
                            task.iscomplete
                              ? "success"
                              : getDaysRemaining(task.dueDate) === "Overdue"
                              ? "danger"
                              : getDaysRemaining(task.dueDate) === "Due today"
                              ? "warning"
                              : "info"
                          }
                          text={
                            task.iscomplete ||
                            getDaysRemaining(task.dueDate) === "Overdue"
                              ? "white"
                              : undefined
                          }
                          className="d-flex align-items-center"
                          style={{ fontSize: "0.7rem", fontWeight: "500" }}
                        >
                          <Clock size={10} className="me-1" />
                          {task.iscomplete
                            ? "Completed"
                            : getDaysRemaining(task.dueDate)}
                        </Badge>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}

              {/* Enhanced pagination */}
              {totalPages > 0 && (
                <div className="d-flex justify-content-center mt-4 mb-3">
                  <div className="bg-white shadow-sm rounded-pill px-2 py-1">
                    <Pagination size="sm" className="mb-0">
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />

                      {[...Array(totalPages)].map((_, index) => {
                        // Show limited pagination numbers on mobile
                        if (
                          totalPages > 5 &&
                          index !== 0 &&
                          index !== totalPages - 1 &&
                          Math.abs(currentPage - (index + 1)) > 1 &&
                          !(index === 1 && currentPage === 4) &&
                          !(
                            index === totalPages - 2 &&
                            currentPage === totalPages - 3
                          )
                        ) {
                          if (index === 1 || index === totalPages - 2) {
                            return (
                              <Pagination.Ellipsis
                                key={`ellipsis-${index}`}
                                disabled
                              />
                            );
                          }
                          return null;
                        }

                        return (
                          <Pagination.Item
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </Pagination.Item>
                        );
                      })}

                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
