import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home.page";
import NotFoundPage from "./pages/not-found.page";

import Layout from "./components/layout";
import CheckLogin from "./features/authentication/check-login";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import TagsPage from "./pages/tags.page";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  {
    element: (
      <CheckLogin>
        <Layout />
      </CheckLogin>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "tags", element: <TagsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
