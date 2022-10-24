import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import useAuthStore from "./auth.store";

interface Props {
  children: ReactNode;
}

export default function CheckLogin({ children }: Props) {
  const isAuth = useAuthStore((state) => state.isAuth);

  return <>{isAuth ? children : <Navigate to={"/login"} replace />}</>;
}
