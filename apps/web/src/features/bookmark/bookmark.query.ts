import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IBookmark, ICreateBookmarkDto, IResponseError } from "types";

import bookmarkService from "./bookmark.service";

interface IDoneOptions {
  onSuccess?: () => any;
}

export const useBookmarksQuery = () => {
  return useQuery<IBookmark[]>(["bookmarks"], bookmarkService.getAll);
};

export const useBookmarkMutation = (doneOptions?: IDoneOptions) => {
  const queryClient = useQueryClient();

  return useMutation<IBookmark, AxiosError<IResponseError>, ICreateBookmarkDto>(
    (data) => bookmarkService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookmarks"]);
        doneOptions?.onSuccess?.();
      },
    }
  );
};
