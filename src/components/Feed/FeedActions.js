import { useState } from "react";
import styles from "./FeedActions.module.css";

const FeedActions = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  return (
    <div className={styles.wrap}>
      <div className={styles.likesWrap}>
        <div
          className={styles.buttons}
          onClick={() => {
            setIsLiked((prev) => !prev);
          }}
        >
          {isLiked ? (
            <i class="fa-solid fa-heart"></i>
          ) : (
            <i class="fa-regular fa-heart"></i>
          )}
        </div>
        <div>
          <i class="fa-regular fa-comment"></i>
        </div>
        <div>
          <i class="fa-regular fa-paper-plane"></i>
        </div>
      </div>
      <div
        onClick={() => {
          setIsMarked((prev) => !prev);
        }}
      >
        {isMarked ? (
          <i class="fa-solid fa-bookmark"></i>
        ) : (
          <i class="fa-regular fa-bookmark"></i>
        )}
      </div>
    </div>
  );
};
export default FeedActions;
