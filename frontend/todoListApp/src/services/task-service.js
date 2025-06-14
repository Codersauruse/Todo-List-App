import authHeader from "./auth-header";
import Apiclient from "./ApiClient";

const API_URL = "/task/";

const createTask = async (task) => {
  try {
    // Make a POST request to your backend API
    const response = await Apiclient.post(API_URL + "create-task", task, {
      headers: authHeader(), // Call authHeader to get the header object
    });
    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating task:", error);
    throw error; // Re-throw error to be handled by the caller
  }
};

const getAllTasks = async (id) => {
  try {
    // Send a GET request to the API

    const response = await Apiclient.get(API_URL + `getAllTasks/${id}`, {
      headers: authHeader(), // Use the authHeader to add Authorization
    });

    // Return the data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
};

const getDailyTasks = async (id) => {
  try {
    console.log(authHeader());
    // Send a GET request to fetch daily tasks
    const response = await Apiclient.get(API_URL + `getDailyTasks/${id}`, {
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
    const response = await Apiclient.delete(`${API_URL}delete/${taskId}`, {
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
    // Send a PATCH request to update specific fields of a tas
    const response = await Apiclient.patch(
      `${API_URL}update/${taskId}`,
      updates,
      {
        headers: authHeader(), // Use authHeader to add the Authorization header
      }
    );

    return response.data; // Return the success message
  } catch (error) {
    console.error("Error updating task:", error);
    throw error; // Re-throw the error to handle in the caller
  }
};

const updateStatus = async (id) => {
  try {
    const response = await Apiclient.patch(
      API_URL + `markAsCompleted/${id}`,
      {},
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("error updating status", error);
    throw new Error(error);
  }
};

export default {
  createTask,
  getAllTasks,
  getDailyTasks,
  deleteTask,
  updateTaskPartial,
  updateStatus,
};
