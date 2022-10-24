import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ICreateTagDto, IResponseError, ITag } from "types";

import tagService from "./tag.service";

interface IDoneOptions {
  onSuccess?: () => any;
}

export const useTagsQuery = () => {
  return useQuery<ITag[]>(["tags"], tagService.getAll);
};

export const useTagMutation = (doneOptions?: IDoneOptions) => {
  const queryClient = useQueryClient();

  return useMutation<ITag, AxiosError<IResponseError>, ICreateTagDto>(
    (data) => tagService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tags"]);
        doneOptions?.onSuccess?.();
      },
    }
  );
};
