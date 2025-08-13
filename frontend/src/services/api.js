import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token if it exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Make sure your token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Backend returned an error response
      console.error("Backend error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response from server:", error.request);
    } else {
      // Something else went wrong
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
