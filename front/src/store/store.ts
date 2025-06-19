import { configureStore } from "@reduxjs/toolkit";
import catsReducer from "../redux/catSlice";
import likesReducer from "../redux/likesSlice";

export const store = configureStore({
  reducer: {
    cats: catsReducer,
    likes: likesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
