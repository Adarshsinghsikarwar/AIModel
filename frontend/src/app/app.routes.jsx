import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import Auth from "../features/auth/pages/Auth";
import Home from "../features/chat/pages/Home";

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default routes;
