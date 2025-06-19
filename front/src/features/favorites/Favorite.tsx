import { useSelector } from "react-redux";
import CatGrid from "../../components/shared/catsGrid/CatsGrid";
import { RootState } from "../../store/store";

export default function Favorite() {
  const likedCats = useSelector((state: RootState) => state.likes.likedCatData);

  if (!likedCats.length) {
    return <p style={{ padding: "1rem" }}>You haven't liked any cats yet 🐱</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <CatGrid cats={likedCats} />
    </div>
  );
}
