import { ICreateTagDto, IUpdateTagDto } from "types";

import axiosConfig from "../../configs/axios.config";

const tagService = {
  getAll: async () => {
    return (await axiosConfig.get("/tags")).data;
  },
  create: async (data: ICreateTagDto) => {
    return (await axiosConfig.post("/tags", data)).data;
  },
  update: async (tagId: string, data: IUpdateTagDto) => {
    return (await axiosConfig.patch(`/tags/${tagId}`, data)).data;
  },
  delete: async (tagId: string) => {
    return (await axiosConfig.delete(`/tags/${tagId}`)).data;
  },
};

export default tagService;
