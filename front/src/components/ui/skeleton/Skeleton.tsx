import React from "react";
import styles from "./Skeleton.module.css";

export const SkeletonCard: React.FC = () => {
  return <div className={styles.skeleton}></div>;
};

interface SkeletonGridProps {
  count?: number;
}

export default function SkeletonGrid({ count = 15 }: SkeletonGridProps) {
  return (
    <div
      className={styles.skeletonGrid}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "50px",
        padding: "50px 60px",
      }}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SkeletonCard key={index} />
        ))}
    </div>
  );
}
