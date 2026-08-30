import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
