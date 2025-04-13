import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ToggleButton,
  ToggleButtonGroup,
  Badge,
  Alert,
} from "react-bootstrap";
import { ClipboardPlus } from "react-bootstrap-icons";
import taskService from "../../../services/task-service";
import { useAuth } from "../../Route/AuthContext";
// Adjust the path if needed

export default function AddTask() {
  const Authuser = useAuth();
  const user = Authuser?.user;
  const [task, setTask] = useState({
    id: user?.id,
    name: "",
    description: "",
    priority: "Medium",
    startDate: "",
    dueDate: "",
    iscomplete: false,
  });

  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const priorities = ["Low", "Medium", "High"];

  const handleChange = (field, value) => {
    setTask({ ...task, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await taskService.createTask(task);
      setFeedback({ message: "Task successfully created!", type: "success" });
      setTask({
        id: user.id,
        name: "",
        description: "",
        priority: "Medium",
        startDate: "",
        dueDate: "",
        iscomplete: false,
      });
    } catch (error) {
      console.error("Task creation failed:", error);
      setFeedback({
        message: "Failed to create task. Please try again.",
        type: "danger",
      });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center bg-light py-5">
      <Card
        className="w-100 shadow-lg p-4 border-0"
        style={{ maxWidth: "700px", borderRadius: "20px" }}
      >
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <ClipboardPlus size={32} className="text-primary" />
            <h3 className="mb-0">Add New Task</h3>
          </div>
          <Badge>new task</Badge>
        </div>

        {feedback.message && (
          <Alert
            variant={feedback.type}
            onClose={() => setFeedback({ message: "", type: "" })}
            dismissible
          >
            {feedback.message}
          </Alert>
        )}

        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            placeholder="Enter task name..."
            className="p-3 rounded-3 shadow-sm border-0"
            value={task.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Task description..."
            className="p-3 rounded-3 shadow-sm border-0"
            value={task.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Form.Group>

        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <Form.Label className="fw-semibold mb-0">Priority:</Form.Label>
              <ToggleButtonGroup
                type="radio"
                name="priority"
                value={task.priority}
                onChange={(val) => handleChange("priority", val)}
              >
                {priorities.map((p) => (
                  <ToggleButton
                    key={p}
                    id={`priority-${p}`}
                    variant={`outline-${getPriorityColor(p)}`}
                    value={p}
                    className="px-3"
                  >
                    {p}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Label className="fw-semibold">Start Date</Form.Label>
            <Form.Control
              type="date"
              className="p-2 rounded-3 shadow-sm border-0"
              value={task.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label className="fw-semibold">Due Date</Form.Label>
            <Form.Control
              type="date"
              className="p-2 rounded-3 shadow-sm border-0"
              value={task.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            className="px-5 py-2 fw-semibold shadow-sm rounded-pill"
            onClick={handleSubmit}
          >
            Add Task
          </Button>
        </div>
      </Card>
    </Container>
  );
}
