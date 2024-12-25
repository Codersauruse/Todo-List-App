import Apiclient from "./ApiClient"; // Import the reusable Axios client

const API_URL = "/api/auth/"; // Relative path for auth-related endpoints

// Register a new user
const register = async (username, email, password) => {
  try {
    const response = await Apiclient.post(API_URL + "register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Log in a user
const login = async (username, password) => {
  try {
    const response = await Apiclient.post(API_URL + "login", {
      username,
      password,
    });

    if (response.data.accessToken) {
      // Store user data (including token) in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data; // Return the server response
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Log out a user
const logout = async () => {
  try {
    localStorage.removeItem("user"); // Remove user data from localStorage
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export default {
  register,
  login,
  logout,
};
