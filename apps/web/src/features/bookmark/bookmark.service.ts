import {
  IBookmark,
  ICreateBookmarkDto,
  ISearchBookmarkDto,
  IUpdateBookmarkDto,
} from "types";

import axiosConfig from "../../configs/axios.config";

const bookmarkService = {
  getAll: async (): Promise<IBookmark[]> => {
    return (await axiosConfig.get("/bookmarks")).data;
  },
  search: async (data: ISearchBookmarkDto): Promise<IBookmark[]> => {
    let url = "/bookmarks/search?";
    if (data.name) {
      url += `name=${data.name}`;
    }
    if (data.href) {
      url += `href=${data.href}`;
    }
    if (data.tag) {
      url += `tag=${data.tag}`;
    }
    return (await axiosConfig.get(url)).data;
  },
  create: async (data: ICreateBookmarkDto): Promise<IBookmark> => {
    return (await axiosConfig.post("/bookmarks", data)).data;
  },
  update: async (
    bookmarkId: string,
    data: IUpdateBookmarkDto
  ): Promise<IBookmark> => {
    return (await axiosConfig.patch(`/bookmarks/${bookmarkId}`, data)).data;
  },
  delete: async (bookmarkId: string) => {
    return (await axiosConfig.delete(`/bookmarks/${bookmarkId}`)).data;
  },
};

export default bookmarkService;
