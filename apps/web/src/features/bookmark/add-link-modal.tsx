import { PlusIcon } from "@heroicons/react/24/outline";
import { isArray, isEmpty } from "lodash-es";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { ICreateBookmarkDto, ICreateTagDto } from "types";

import Error from "../../components/error";
import Modal from "../../components/modal";

import useAddLinkModalStore from "./add-link-modal.store";
import { useBookmarkMutation } from "./bookmark.query";

export default function AddLinkModal() {
  const isOpen = useAddLinkModalStore((state) => state.isOpen);
  const closeModal = useAddLinkModalStore((state) => state.closeModal);

  const [tags, setTags] = useState<ICreateTagDto[]>([]);
  const tagsRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm<ICreateBookmarkDto>();

  const bookmarkMutation = useBookmarkMutation({
    onSuccess: () => {
      reset();
      closeModal();
      setTags([]);
    },
  });

  const onSubmit = async (data: ICreateBookmarkDto) => {
    data = { ...data, tags };
    bookmarkMutation.mutate(data);
  };

  const checkDuplicatedTag = (name: string): boolean => {
    return tags.some((tag) => tag.name === name);
  };
  const addTag = () => {
    const value = tagsRef.current?.value;
    if (checkDuplicatedTag(value || "")) return;
    if (value) {
      setTags((prev) => [...prev, { name: value }]);
      tagsRef.current.value = "";
    }
  };
  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const errors = bookmarkMutation.error?.response?.data.message;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Add Link">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>

          <input
            type="text"
            className="input"
            {...register("name", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">URL</span>
          </label>

          <input
            type="text"
            className="input"
            {...register("href", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Tags</span>
          </label>

          {!isEmpty(tags) && (
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="badge badge-secondary cursor-pointer hover:opacity-90"
                  onClick={() => removeTag(index)}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          )}

          <div className="flex">
            <input type="text" className="input w-full" ref={tagsRef} />
            <button
              className="btn btn-ghost btn-square"
              onClick={addTag}
              type="button"
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {bookmarkMutation.isError &&
          (isArray(errors) ? (
            errors.map((e) => <Error text={e} className="mt-4" />)
          ) : (
            <Error text={errors} className="mt-4" />
          ))}

        <div>
          <button className="btn btn-primary mt-6 w-full">Save</button>
        </div>
      </form>
    </Modal>
  );
}
