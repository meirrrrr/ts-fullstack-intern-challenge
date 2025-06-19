import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import CatGrid from "../../components/shared/catsGrid/CatsGrid";
import SkeletonGrid from "../../components/ui/skeleton/Skeleton";
import ErrorMessage from "../../components/ui/error/Error";

export default function Home() {
  const {
    items: cats,
    status,
    error,
  } = useSelector((state: RootState) => state.cats);

  if (status === "loading") {
    return <SkeletonGrid count={15} />;
  }

  if (status === "failed") return <ErrorMessage message={error} />;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <CatGrid cats={cats} />
    </div>
  );
}
