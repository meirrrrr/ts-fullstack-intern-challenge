import { useSelector } from "react-redux";
import CatGrid from "../../components/shared/catsGrid/CatsGrid";
import { RootState } from "../../store/store";
import styles from "./Favorite.module.css";

export default function Favorite() {
  const likedCats = useSelector((state: RootState) => state.likes.likedCatData);

  if (!likedCats.length) {
    return <div>... загружаем любимых котиков ...</div>;
  }

  return (
    <div className={styles.gridContainer}>
      <CatGrid cats={likedCats} />
    </div>
  );
}
