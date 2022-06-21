import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URL || "/api",
  headers: {
    "Content-type": "application/json"
  }
});