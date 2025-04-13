import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TaskCalendar from "./TaskCalendar";
import { useAuth } from "../../Route/AuthContext";
import taskService from "../../../services/task-service";
import taskListAtom from "../../../Components/Recoil/atom";
import { useRecoilState } from "recoil";

export default function ViewTasks() {
  // Sample task data - in a real app, this would come from your API
  const Authuser = useAuth();
  const userId = Authuser?.user?.id;
  const [tasks, setTasks] = useState([]);
  const [tasklist, setTaskList] = useRecoilState(taskListAtom);

  useEffect(() => {
    async function getAllTasks() {
      try {
        const response = await taskService.getAllTasks(userId);
        console.log(response);
        setTasks(response);
      } catch (error) {
        console.log(error);
      }
    }
    getAllTasks();
  }, []);

  if (tasks.length > 0) {
    setTaskList(tasks);
    console.log("this is task list ");
    console.log(tasklist);
  }

  return (
    <Container style={{ marginTop: "80px" }}>
      <h1 className="my-4">Task Calendar</h1>
      <TaskCalendar tasks={tasks} />
    </Container>
  );
}
