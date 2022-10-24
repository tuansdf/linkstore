import { isArray } from "lodash-es";
import { useForm } from "react-hook-form";

import { ICreateTagDto } from "types";

import Error from "../../components/error";
import Modal from "../../components/modal";

import useAddTagModalStore from "./add-tag-modal.store";
import { useTagMutation } from "./tag.query";

export default function AddTagModal() {
  const isOpen = useAddTagModalStore((state) => state.isOpen);
  const closeModal = useAddTagModalStore((state) => state.closeModal);

  const { register, handleSubmit, reset } = useForm<ICreateTagDto>();

  const tagMutation = useTagMutation({
    onSuccess: () => {
      reset();
      closeModal();
    },
  });

  const onSubmit = async (data: ICreateTagDto) => {
    tagMutation.mutate(data);
  };

  const errors = tagMutation.error?.response?.data.message;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Add Tag">
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

        {tagMutation.isError &&
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
