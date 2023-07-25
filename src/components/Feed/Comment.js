import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <div className={styles.wrap}>
      <span className={styles.innerWrap}>
        <span onClick={null} className={styles.nickName}>
          {comment.nickName}
        </span>
        <span className={styles.commentText}>{comment.commentText}</span>
      </span>
      <div className={styles.editIcon}>
        <i className="fa-solid fa-ellipsis"></i>
      </div>
    </div>
  );
};

export default Comment;
