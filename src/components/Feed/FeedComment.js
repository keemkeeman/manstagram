import styles from "./FeedComment.module.css";

const FeedComment = () => {
  /* 댓글 뿌려줘야 함 */
  const n = 10;
  return (
    <div className={styles.wrap}>
      <span className={styles.commentOpen}>댓글 {n}개 모두 보기</span>
      <div className={styles.commentsWrap}>
        <span className={styles.nickName}>nic</span>
        <span className={styles.comment}>comment</span>
      </div>
    </div>
  );
};

export default FeedComment;
