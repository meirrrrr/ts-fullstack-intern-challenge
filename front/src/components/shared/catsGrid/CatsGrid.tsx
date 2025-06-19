import { useEffect, useRef } from "react";
import CatCard from "../catCard/CatCard";
import styles from "./CatsGrid.module.css";

type CatItem = {
  id: string;
  url: string;
};

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
    if (!loaderRef.current || !onLoadMore) return;

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

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
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
