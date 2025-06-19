import { Link } from "react-router-dom";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navItem}>
          Все котики
        </Link>
        <Link to="/favorites" className={styles.navItem}>
          Любимые котики
        </Link>
      </nav>
    </header>
  );
}
