import styles from "./FeedDescription.module.css";

const FeedDescription = ({ feed }) => {
  return (
    <div className={styles.wrap}>
      <span>
        <span className={styles.nickName} onClick={null}>
          {feed.nickName}
        </span>
        <span className={styles.feedText}>{feed.feedText}</span>
      </span>
    </div>
  );
};

export default FeedDescription;
