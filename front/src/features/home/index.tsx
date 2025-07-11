import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

import CatGrid from "../../components/shared/catsGrid/CatsGrid";
import SkeletonGrid from "../../components/ui/skeleton/Skeleton";
import ErrorMessage from "../../components/ui/error/Error";

import { fetchCats } from "../../redux/catSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: cats,
    status,
    error,
  } = useSelector((state: RootState) => state.cats);

  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = useCallback(() => {
    if (loadingMore) return;

    setLoadingMore(true);
    dispatch(fetchCats(15)).finally(() => setLoadingMore(false));
  }, [dispatch, loadingMore]);

  if (status === "loading" && cats.length === 0) {
    return <SkeletonGrid count={15} />;
  }

  if (status === "failed") return <ErrorMessage message={error} />;

  return (
    <>
      <CatGrid
        cats={cats}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
      />
    </>
  );
}
