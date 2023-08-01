import styles from "./FeedDescription.module.css";
import { Link } from "react-router-dom";

const FeedDescription = ({ feed }) => {
  return (
    <div className={styles.wrap}>
      <span>
        <Link to={`/profile/${feed.creatorId}`} className={styles.nickName}>
          {feed.nickName}
        </Link>
        <span className={styles.feedText}>{feed.feedText}</span>
      </span>
    </div>
  );
};

export default FeedDescription;
