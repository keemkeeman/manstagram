import { useState } from "react";
import styles from "./FeedActions.module.css";
import { likeFeed, isLikedUser } from "../../fireUtil";

const FeedActions = ({ feed, feedLikes, setFeedLikes }) => {
  const [isLiked, setIsLiked] = useState(isLikedUser(feed));
  const [isMarked, setIsMarked] = useState(false);

  const handleLike = async () => {
    // const newLikes = isLiked ? feedLikes - 1 : feedLikes + 1;
    // setFeedLikes(newLikes);
    await likeFeed(feed, isLiked);
    setIsLiked((prev) => !prev);
  };

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
