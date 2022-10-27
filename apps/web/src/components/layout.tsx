import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  HomeIcon,
  PlusIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import AddLinkModal from "../features/bookmark/add-link-modal";
import AddTagModal from "../features/tag/add-tag-modal";

import { useForm } from "react-hook-form";
import useAuthStore from "../features/authentication/auth.store";
import useAddLinkModalStore from "../features/bookmark/add-link-modal.store";
import useAddTagModalStore from "../features/tag/add-tag-modal.store";

interface IFormValues {
  search: string;
}

export default function Layout() {
  const navigate = useNavigate();

  const openLinkModal = useAddLinkModalStore((state) => state.openModal);
  const openTagModal = useAddTagModalStore((state) => state.openModal);
  const logoutUser = useAuthStore((state) => state.logout);

  const { register, handleSubmit } = useForm<IFormValues>();

  const onSubmit = (data: IFormValues) => {
    navigate(`/search?name=${data.search}`);
  };

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* sidebar */}
      <div className="flex h-screen flex-col justify-between bg-base-200">
        <ul className="menu">
          <li>
            <NavLink to="/">
              <HomeIcon className="h-8 w-8" />
            </NavLink>
          </li>
          <li>
            <button onClick={openLinkModal}>
              <PlusIcon className="h-8 w-8" />
            </button>
          </li>
          <li>
            <NavLink to="/tags">
              <TagIcon className="h-8 w-8" />
            </NavLink>
          </li>
          <li>
            <button onClick={openTagModal}>
              <PlusIcon className="h-8 w-8" />
            </button>
          </li>
        </ul>

        <ul className="menu">
          <li>
            <NavLink to="/settings">
              <Cog6ToothIcon className="h-8 w-8" />
            </NavLink>
          </li>
          <li>
            <button onClick={logout}>
              <ArrowLeftOnRectangleIcon className="h-8 w-8" />
            </button>
          </li>
        </ul>
      </div>

      <div className="flex min-h-screen w-full flex-col">
        {/* navbar */}
        <div className="bg-base-200 p-2">
          <div className="flex-none">
            <form onSubmit={handleSubmit(onSubmit)} className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input bg-transparent"
                {...register("search")}
              />
            </form>
          </div>
        </div>

        <div className="flex-1">
          <Outlet />

          <AddLinkModal />
          <AddTagModal />
        </div>
      </div>
    </div>
  );
}
