import { useRoutes } from "react-router-dom";
import { DonePage, ToDoPage } from "../pages";
export default function AppRouter() {
  const routes = useRoutes([
    { path: "/", element: <ToDoPage /> },
    { path: "/done", element: <DonePage /> },
  ]);
  return routes;
}
