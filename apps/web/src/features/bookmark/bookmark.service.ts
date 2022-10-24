import { IBookmark, ICreateBookmarkDto, IUpdateBookmarkDto } from "types";

import axiosConfig from "../../configs/axios.config";

const bookmarkService = {
  getAll: async (): Promise<IBookmark[]> => {
    return (await axiosConfig.get("/bookmarks")).data;
  },
  create: async (data: ICreateBookmarkDto) => {
    return (await axiosConfig.post("/bookmarks", data)).data;
  },
  update: async (bookmarkId: string, data: IUpdateBookmarkDto) => {
    return (await axiosConfig.patch(`/bookmarks/${bookmarkId}`, data)).data;
  },
  delete: async (bookmarkId: string) => {
    return (await axiosConfig.delete(`/bookmarks/${bookmarkId}`)).data;
  },
};

export default bookmarkService;
