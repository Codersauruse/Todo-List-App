import axios from "axios";

const Apiclient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Apiclient;
