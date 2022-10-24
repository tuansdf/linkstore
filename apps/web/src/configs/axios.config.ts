import axios from "axios";

import useAuthStore from "../features/authentication/auth.store";

const user = useAuthStore.getState().user;

const axiosConfig = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${user?.accessToken}`,
  },
});

export default axiosConfig;
