import clsx from "clsx";
import { isArray } from "lodash-es";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { IRegisterUserDto } from "types";

import Error from "../components/error";

import useAuthStore from "../features/authentication/auth.store";

export default function RegisterPage() {
  const registerUser = useAuthStore((state) => state.register);
  const isError = useAuthStore((state) => state.isError);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IRegisterUserDto>();

  const onSubmit = (data: IRegisterUserDto) => {
    registerUser(data, { onSuccess: () => navigate("/", { replace: true }) });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-200 shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="card-title mb-8 text-2xl">Create your account</div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              className="input"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="input"
            />
          </div>

          {isError &&
            (isArray(error?.message) ? (
              error?.message.map((e) => <Error text={e} className="mt-4" />)
            ) : (
              <Error text={error?.message} className="mt-4" />
            ))}

          <button
            className={clsx("btn btn-primary mt-8", {
              loading: isLoading,
            })}
          >
            Sign up
          </button>

          <div className="mt-2 text-right">
            Have an account?{" "}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
