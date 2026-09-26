import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 60000,
  withCredentials: true,
});

export default axiosInstance;
