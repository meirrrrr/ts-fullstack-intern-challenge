import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CatGrid from "../../components/shared/catsGrid/CatsGrid";
import { RootState } from "../../store/store";
import styles from "./Favorite.module.css";

export default function Favorite() {
  const navigate = useNavigate();
  const likedCats = useSelector((state: RootState) => state.likes.likedCatData);

  const isEmpty = likedCats.length === 0;

  if (isEmpty) {
    return (
      <div className={styles.emptyContainer}>
        <h2 className={styles.message}>У вас пока нет любимых котиков</h2>
        <p className={styles.subtext}>
          Добавьте кого-нибудь из главной страницы
        </p>
        <button className={styles.button} onClick={() => navigate("/")}>
          🐾 К котикам
        </button>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      <CatGrid cats={likedCats} />
    </div>
  );
}
