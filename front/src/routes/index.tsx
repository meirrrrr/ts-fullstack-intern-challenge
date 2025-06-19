import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFound from "../components/shared/notFound/NotFound";
import Home from "../features/home";
import Favorite from "../features/favorites/Favorite";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/favorites" element={<Favorite />} />
      </Route>
    </Routes>
  );
}
