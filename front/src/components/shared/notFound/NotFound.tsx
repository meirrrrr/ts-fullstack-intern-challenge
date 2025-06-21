import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Страница не найдена</h1>
      <p className={styles.text}>
        Проверьте адрес или вернитесь на главную страницу.
      </p>
      <button className={styles.link} onClick={() => navigate("/")}>
        На главную странице
      </button>
    </div>
  );
}
