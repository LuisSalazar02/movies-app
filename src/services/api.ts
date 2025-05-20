import axios from "axios";
import Config from "@/config";

const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_MDB_API_KEY}`;
    newConfig.headers.accept = "application/json";
    console.log("Making request to: ", newConfig);
    return newConfig;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response error: ", error);
    return Promise.reject(error);
  }
);

export default api;
