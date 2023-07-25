import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <div className={styles.wrap}>
      <span>
        <span onClick={null} className={styles.nickName}>
          {comment.nickName}
        </span>
        <span className={styles.commentText}>{comment.commentText}</span>
      </span>
    </div>
  );
};

export default Comment;
