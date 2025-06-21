import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCats } from "../redux/catSlice";
import { fetchLikes } from "../redux/likesSlice";
import { initUserSession } from "../services/initUserSession";
import { AppDispatch } from "../store/store";

export function useInitApp() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const start = async () => {
      try {
        await initUserSession();
        dispatch(fetchCats(15));
        dispatch(fetchLikes());
      } catch (e) {
        console.error("App initialization failed:", e);
      }
    };

    start();
  }, [dispatch]);
}
