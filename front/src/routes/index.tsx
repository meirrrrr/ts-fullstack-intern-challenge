import { Routes, Route } from "react-router-dom";

import Layout from "../layout/Layout";
import NotFound from "../components/shared/notFound/NotFound";
import Favorite from "../features/favorites/Favorite";
import Home from "../features/home";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/favorites", element: <Favorite /> },
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
