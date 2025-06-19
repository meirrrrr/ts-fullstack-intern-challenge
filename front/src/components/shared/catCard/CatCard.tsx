import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { CatItem } from "../../../types/types";
import { RootState, AppDispatch } from "../../../store/store";
import { addLike, removeLike } from "../../../redux/likesSlice";

import styles from "./CatCard.module.css";
import full_heart from "../../../assets/full_heart.svg";
import outlined_heart from "../../../assets/outlined_heart.svg";

type CatCardProps = {
  cat: CatItem;
};

export default function CatCard({ cat }: CatCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const likedCats = useSelector((state: RootState) => state.likes.likedCats);

  const [isHovered, setIsHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);

  const liked = likedCats.includes(cat.id);

  const handleLikeToggle = () => {
    liked ? dispatch(removeLike(cat.id)) : dispatch(addLike(cat));
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={styles.catCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={cat.url} alt={cat.url} className={styles.catImage} />

      {isHovered && (
        <img
          src={liked || iconHovered ? full_heart : outlined_heart}
          alt={`Cat image: ${cat.id || "unknown"}`}
          className={styles.heartIcon}
          onClick={handleLikeToggle}
          onMouseEnter={() => setIconHovered(true)}
          onMouseLeave={() => setIconHovered(false)}
        />
      )}
    </div>
  );
}
