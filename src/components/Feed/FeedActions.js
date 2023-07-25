import { useEffect, useState } from "react";
import styles from "./FeedActions.module.css";
import { likeFeed, isLikedUser } from "../../fireUtil";

const FeedActions = ({ feed, nowUser }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMarked, setIsMarked] = useState(false);

  /* 좋아요 on/off */
  const handleLike = async () => {
    await likeFeed(feed, isLiked, nowUser);
    setIsLiked((prev) => !prev);
  };

  /* 좋아요 여부 가져오기 */
  useEffect(() => {
    isLikedUser(feed, setIsLiked, nowUser);
  }, [feed, nowUser]);

  return (
    <div className={styles.wrap}>
      <div className={styles.likesWrap}>
        <div id="like" className={styles.buttons} onClick={handleLike}>
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
