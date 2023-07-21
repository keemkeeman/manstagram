import styles from "./FeedDescription.module.css";

const FeedDescription = ({ feed }) => {
  return (
    <div className={styles.wrap}>
      <span className={styles.nickName}>{feed.nickName}</span>
      <span className={styles.feedText}>{feed.feedText}</span>
    </div>
  );
};

export default FeedDescription;
