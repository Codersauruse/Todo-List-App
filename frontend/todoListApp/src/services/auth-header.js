export default function authHeader() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    // Check if the user object and token are retrieved correctly

    if (user && user.accessToken) {
      return { Authorization: "Bearer " + user.accessToken };
    } else {
      return {};
    }
  } catch (error) {
    console.error("Failed to retrieve auth header:", error);
    return {};
  }
}
