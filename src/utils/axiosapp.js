import axios from "axios";
import { BASE_URL } from "./constansts";

const axiosapp = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosapp.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosapp;
