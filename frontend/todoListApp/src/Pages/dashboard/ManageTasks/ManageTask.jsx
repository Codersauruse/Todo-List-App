import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
  Pagination,
} from "react-bootstrap";
import { useAuth } from "../../Route/AuthContext";
import taskService from "../../../services/task-service";
import toast from "react-hot-toast";

export default function ManageTask() {
  // Authentication and user info
  const Authuser = useAuth();
  const userId = Authuser?.user?.id;

  // State variables
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchPriority, setSearchPriority] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(3);

  // Fetch tasks from backend
  useEffect(() => {
    async function getAllTasks() {
      setIsLoading(true);
      try {
        const response = await taskService.getAllTasks(userId);
        console.log(response);
        setTasks(response);
        setFilteredTasks(response);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) {
      getAllTasks();
    }
  }, [userId]);

  // Filter tasks when search criteria changes
  useEffect(() => {
    let result = tasks;

    if (searchName) {
      result = result.filter((task) =>
        task.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchPriority) {
      result = result.filter((task) => task.priority === searchPriority);
    }

    if (searchStartDate) {
      result = result.filter((task) => task.startDate === searchStartDate);
    }

    setFilteredTasks(result);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchName, searchPriority, searchStartDate, tasks]);

  // Get current tasks for pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle updating a task
  const handleUpdate = (task) => {
    setCurrentTask({ ...task });
    setShowUpdateModal(true);
  };

  // Handle deleting a task
  const handleDelete = async (task) => {
    setCurrentTask(task);
    setShowDeleteModal(true);
  };

  // Confirm task update
  const confirmUpdate = async () => {
    try {
      // Call the API to update the task
      console.log("current task");
      console.log(currentTask);
      const { id, iscomplete, user, ...newtask } = currentTask;
      console.log(newtask);
      const response = await taskService.updateTaskPartial(
        currentTask.id,
        newtask
      );
      console.log(response);
      toast.success(response);

      // Update local state
      setTasks(
        tasks.map((task) => (task.id === currentTask.id ? currentTask : task))
      );
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.message);
      // You could add error handling UI here
    }
  };

  // Confirm task deletion
  const confirmDelete = async () => {
    try {
      // Call the API to delete the task
      const response = await taskService.deleteTask(currentTask.id);
      console.log(response);
      toast.success(response);
      // Update local state
      setTasks(tasks.filter((task) => task.id !== currentTask.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.message);
      // You could add error handling UI here
    }
  };

  // Handle form input changes for update modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({
      ...currentTask,
      [name]: value,
    });
  };

  // Reset search filters
  const resetFilters = () => {
    setSearchName("");
    setSearchPriority("");
    setSearchStartDate("");
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Manage Tasks</h2>

      {/* Search and Filter Section */}
      <div className="bg-light p-4 rounded mb-4">
        <h5>Search and Filter</h5>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={searchPriority}
                onChange={(e) => setSearchPriority(e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={searchStartDate}
                onChange={(e) => setSearchStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="secondary" className="mt-3" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading tasks...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Tasks Table */}
      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.length > 0 ? (
                currentTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                      <span
                        className={`badge ${
                          task.priority === "High"
                            ? "bg-danger"
                            : task.priority === "Medium"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td>{task.startDate}</td>
                    <td>{task.dueDate}</td>
                    <td>
                      {!task.iscomplete && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleUpdate(task)}
                        >
                          Update
                        </Button>
                      )}

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(task)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && filteredTasks.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />

            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* Update Task Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentTask.name || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentTask.description || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={currentTask.priority || ""}
                onChange={handleInputChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={currentTask.startDate || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={currentTask.dueDate || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the task "{currentTask.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
