import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      {/* <SearchX width={80} height={80} className={styles.icon} /> */}
      <h1 className={styles.title}>404 - Страница не найдена</h1>
      <p className={styles.text}>
        Проверьте адрес или вернитесь на главную страницу.
      </p>
      <Link to="/" className={styles.link}>
        На главную странице
      </Link>
    </div>
  );
}
