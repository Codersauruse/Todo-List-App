import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://backend:8080/api/admin"; // Assuming the base URL for admin APIs

const getAllUsers = async () => {
  try {
    // Send a GET request to fetch all users
    const response = await axios.get(`${API_URL}/getAllUsers`, {
      headers: authHeader(), // Use authHeader to add the Authorization header
    });

    return response.data; // Return the list of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error to handle in the caller
  }
};

const deleteUser = async (userId) => {
  try {
    // Send a DELETE request to delete a user by ID
    const response = await axios.delete(`${API_URL}/deleteUser/${userId}`, {
      headers: authHeader(), // Use authHeader to add the Authorization header
    });

    return response.data; // Return the success message
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Re-throw the error to handle in the caller
  }
};

export default { deleteUser, getAllUsers };
