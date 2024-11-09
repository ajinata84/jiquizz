import Auth from "@/pages/Auth/Auth";
import Home from "@/pages/Home/Home";
import Quiz from "@/pages/Quiz/Quiz";
import Result from "@/pages/Result/Result";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);
