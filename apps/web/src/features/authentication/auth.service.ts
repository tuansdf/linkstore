import { ILoginUserDto, IRegisterUserDto } from "types";

import axiosConfig from "../../configs/axios.config";

const authService = {
  login: async (data: ILoginUserDto) => {
    return (await axiosConfig.post("/auth/login", data)).data;
  },
  register: async (data: IRegisterUserDto) => {
    return (await axiosConfig.post("/auth/register", data)).data;
  },
};

export default authService;
