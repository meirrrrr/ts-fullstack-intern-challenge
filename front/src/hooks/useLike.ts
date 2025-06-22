import { useDispatch, useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import { addLike, removeLike } from "../redux/likesSlice";
import { CatItem } from "../types/types";
import { RootState, AppDispatch } from "../store/store";

export function useLike(cat: CatItem) {
  const dispatch = useDispatch<AppDispatch>();
  const likedCats = useSelector((state: RootState) => state.likes.likedCats);
  const catId = cat.id;

  const isLiked = useMemo(() => likedCats.includes(catId), [likedCats, catId]);

  const toggleLike = useCallback(() => {
    isLiked ? dispatch(removeLike(cat.id)) : dispatch(addLike(cat));
  }, [isLiked, dispatch, cat]);

  return { isLiked, toggleLike };
}
