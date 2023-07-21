import styles from "./FeedCommentInput.module.css";

const FeedCommentInput = () => {
  return (
    <div className={styles.wrap}>
      <input className={styles.commentInput} placeholder="댓글 달기..." />
      <div className={styles.commentEmoji}>
        <i class="fa-regular fa-face-smile"></i>
      </div>
    </div>
  );
};

export default FeedCommentInput;
