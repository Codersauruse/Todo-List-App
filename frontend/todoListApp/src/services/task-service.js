import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/task";

const createTask = async (task) => {
  try {
    // Make a POST request to your backend API
    const response = await axios.post(API_URL + "/create-task", task, {
      headers: authHeader(), // Call authHeader to get the header object
    });
    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating task:", error);
    throw error; // Re-throw error to be handled by the caller
  }
};

const getAllTasks = async () => {
  try {
    // Send a GET request to the API

    const response = await axios.get(API_URL + "/getAllTasks", {
      headers: authHeader(), // Use the authHeader to add Authorization
    });

    // Return the data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
};

const getDailyTasks = async () => {
  try {
    console.log(authHeader());
    // Send a GET request to fetch daily tasks
    const response = await axios.get(API_URL + "/getDailyTasks", {
      headers: authHeader(), // Use authHeader to add the Authorization header
    });

    // Return the data (list of tasks)
    return response.data;
  } catch (error) {
    console.error("Error fetching daily tasks:", error);
    throw error; // Re-throw to handle in the caller
  }
};

const deleteTask = async (taskId) => {
  try {
    // Send a DELETE request to delete the task by ID
    const response = await axios.delete(`${API_URL}/delete/${taskId}`, {
      headers: authHeader(), // Use authHeader to add the Authorization header
    });

    return response.data; // Return the success message
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Re-throw the error to handle in the caller
  }
};

const updateTaskPartial = async (taskId, updates) => {
  try {
    // Send a PATCH request to update specific fields of a task
    const response = await axios.patch(`${API_URL}/update/${taskId}`, updates, {
      headers: authHeader(), // Use authHeader to add the Authorization header
    });

    return response.data; // Return the success message
  } catch (error) {
    console.error("Error updating task:", error);
    throw error; // Re-throw the error to handle in the caller
  }
};

export default {
  createTask,
  getAllTasks,
  getDailyTasks,
  deleteTask,
  updateTaskPartial,
};
