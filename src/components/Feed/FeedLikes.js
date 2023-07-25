import { useEffect, useState } from "react";
import styles from "./FeedLikes.module.css";
import { countLikes } from "../../fireUtil";

const FeedLikes = ({ feed }) => {
  const [likseCount, setLikesCount] = useState(0);

  /* 좋아요 개수 불러오기 */
  useEffect(() => {
    countLikes(feed, setLikesCount);
  }, [feed]);

  console.log(likseCount);

  return (
    <div className={styles.wrap}>
      <div className={styles.likes}>좋아요 {likseCount}개</div>
    </div>
  );
};
export default FeedLikes;
