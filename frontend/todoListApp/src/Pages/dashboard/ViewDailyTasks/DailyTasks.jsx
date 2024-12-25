import Task from "../../../Components/Task/Task";
import "./DailyTasks.css";
import { useEffect, useState } from "react";
import TaskService from "../../../services/task-service";

export default function DailyTasks() {
  const [myList, setList] = useState([]); // Initialize with an empty array
  const [isLoading, setLoading] = useState(true); // For showing a loading spinner

  useEffect(() => {
    async function fetchDailyTasks() {
      try {
        const res = await TaskService.getDailyTasks(); // Call the API to get tasks
        setList(res); // Set the list with the fetched data
      } catch (error) {
        console.error("Error fetching daily tasks:", error);
      } finally {
        setLoading(false); // Set loading to false once API call completes
      }
    }

    fetchDailyTasks();
  }, []); // Empty dependency array to run on mount only

  return (
    <>
      <div className="task-container">
        <div className="title">
          <h2>Daily Tasks</h2>
        </div>

        {isLoading ? (
          <div className="fs-1 fw-bold">Loading...</div>
        ) : (
          <div className="tasks">
            {myList.length > 0 ? (
              myList.map((task) => <Task key={task.id} name={task.name} />)
            ) : (
              <p>No tasks for today!</p> // Message if no tasks are returned
            )}
          </div>
        )}
      </div>
    </>
  );
}
