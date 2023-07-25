import { useEffect, useState } from "react";
import styles from "./FeedLikes.module.css";
import { countLikes } from "../../fireUtil";

const FeedLikes = ({ feed }) => {
  const [likesCount, setLikesCount] = useState(0);

  /* 좋아요 개수 불러오기 */
  useEffect(() => {
    countLikes(feed, setLikesCount);
  }, [feed]);

  console.log(likesCount);

  return (
    <div className={styles.wrap}>
      <div className={styles.likes}>좋아요 {likesCount}개</div>
    </div>
  );
};
export default FeedLikes;
