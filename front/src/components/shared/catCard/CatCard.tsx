import { CatItem } from "../../../types/types";
import { useState } from "react";
import full_heart from "../../../assets/full_heart.svg";
import outlined_heart from "../../../assets/outlined_heart.svg";
import { useLike } from "../../../hooks/useLike";

import styles from "./CatCard.module.css";

type CatCardProps = {
  cat: CatItem;
};

export default function CatCard({ cat }: CatCardProps) {
  const { isLiked, toggleLike } = useLike(cat);

  const [isHovered, setIsHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleIconMouseEnter = () => setIconHovered(true);
  const handleIconMouseLeave = () => setIconHovered(false);

  return (
    <div
      className={styles.catCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={cat.url}
        alt={`Cat image: ${cat.id}` || "unknown"}
        className={styles.catImage}
        loading="lazy"
      />

      {isHovered && (
        <img
          src={isLiked || iconHovered ? full_heart : outlined_heart}
          alt={`Cat image: ${cat.id || "unknown"}`}
          className={styles.heartIcon}
          onClick={toggleLike}
          onMouseEnter={handleIconMouseEnter}
          onMouseLeave={handleIconMouseLeave}
          loading="lazy"
        />
      )}
    </div>
  );
}
