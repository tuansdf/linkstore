import axios, { AxiosInstance } from "axios";

import useAuthStore from "../features/authentication/auth.store";

const getToken = useAuthStore.getState().getToken;

let axiosConfig: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosConfig.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }
  return config;
});

export default axiosConfig;
