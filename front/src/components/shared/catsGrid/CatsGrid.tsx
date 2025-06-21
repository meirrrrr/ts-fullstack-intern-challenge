import { useEffect, useRef } from "react";
import CatCard from "../catCard/CatCard";
import styles from "./CatsGrid.module.css";
import { CatItem } from "../../../types/types";

type CatGridProps = {
  cats: CatItem[];
  onLoadMore?: () => void;
  loadingMore?: boolean;
};

export default function CatGrid({
  cats,
  onLoadMore,
  loadingMore,
}: CatGridProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 1.0,
      }
    );

    observer.observe(loader);
    return () => {
      observer.unobserve(loader);
    };
  }, [onLoadMore]);

  return (
    <>
      <div className={styles.catsGrid}>
        {cats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
      <div ref={loaderRef} className={styles.loader}>
        {loadingMore && "... загружаем еще котиков ..."}
      </div>
    </>
  );
}
