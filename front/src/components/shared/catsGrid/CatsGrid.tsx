import CatCard from "../catCard/CatCard";
import styles from "./CatsGrid.module.css";

type CatItem = {
  id: string;
  url: string;
};

type CatGridProps = {
  cats: CatItem[];
};

export default function CatGrid({ cats }: CatGridProps) {
  return (
    <div className={styles.catsGrid}>
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
}
