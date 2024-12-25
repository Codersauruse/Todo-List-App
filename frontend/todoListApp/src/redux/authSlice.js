import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth", // The name of the slice
  initialState, // The initial state
  reducers: {
    // Reducer functions to handle actions
    login(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logout(state) {
      state.username = "";
      state.token = "";
    },
  },
});

// Export actions for use in components
export const { login, logout } = authSlice.actions;

// Export the reducer to be used in the Redux store
export default authSlice.reducer;
