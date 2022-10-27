import create from "zustand";
import { persist } from "zustand/middleware";

import {
  IJwtResponse,
  ILoginUserDto,
  IRegisterUserDto,
  IResponseError,
} from "types";

import axios from "axios";
import authService from "./auth.service";

interface IDoneOptions {
  onSuccess?: () => any;
  onError?: () => any;
}

interface AuthState {
  user: IJwtResponse | undefined;
  getToken: () => string | undefined;
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  error: IResponseError | undefined;
  login: (data: ILoginUserDto, options?: IDoneOptions) => void;
  register: (data: IRegisterUserDto, options?: IDoneOptions) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: undefined,
      getToken: () => get().user?.accessToken,
      isAuth: false,
      isLoading: false,
      isError: false,
      error: undefined,
      login: async (data: ILoginUserDto, options?: IDoneOptions) => {
        set({ isError: false, isLoading: true, error: undefined });
        try {
          const user = await authService.login(data);
          set({ user, isAuth: true, isLoading: false });
          options?.onSuccess?.();
        } catch (e) {
          set({
            isError: true,
            isLoading: false,
            error: axios.isAxiosError(e) ? e.response?.data : undefined,
          });
          options?.onError?.();
        }
      },
      register: async (data: IRegisterUserDto, options?: IDoneOptions) => {
        set({ isError: false, isLoading: true, error: undefined });
        try {
          const user = await authService.register(data);
          set({ user, isAuth: true, isLoading: false });
          options?.onSuccess?.();
        } catch (e) {
          set({
            isError: true,
            isLoading: false,
            error: axios.isAxiosError(e) ? e.response?.data : undefined,
          });
          options?.onError?.();
        }
      },
      logout: () => {
        set({ isAuth: false, user: undefined });
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
