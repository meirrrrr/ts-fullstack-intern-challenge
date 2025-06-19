import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "./store/store";
import { fetchCats } from "./redux/catSlice";
import { fetchLikes } from "./redux/likesSlice";
import { registerUser } from "./api/registerUser";
import AppRoutes from "./routes";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      const randomLogin = "user_" + Date.now();
      registerUser(randomLogin, "123456")
        .then(() => console.log("User registered"))
        .catch((err) => console.error("Failed to register user:", err));
    }

    dispatch(fetchCats(15));
    dispatch(fetchLikes());
  }, [dispatch]);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}
