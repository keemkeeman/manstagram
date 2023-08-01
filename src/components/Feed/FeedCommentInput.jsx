import styles from "./FeedCommentInput.module.css";
import { createComment } from "../../fireUtil";

const FeedCommentInput = ({
  feed,
  comments,
  setComments,
  nowUser,
  commentText,
  setCommentText,
  setCommentCounts,
}) => {
  const handleComment = (e) => {
    setCommentText(e.target.value);
  };

  /* 댓글 등록 */
  const handleSubmit = async () => {
    if (commentText === "") {
      window.alert("1자 이상은 필수입니다.");
    } else {
      const newComment = await createComment(commentText, nowUser, feed);
      setComments([newComment, ...comments]);
      setCommentCounts((prev) => prev + 1);
      setCommentText("");
    }
  };

  return (
    <div className={styles.wrap}>
      <input
        id="commentInput"
        value={commentText}
        className={styles.commentInput}
        placeholder="댓글 달기..."
        onChange={handleComment}
      />
      <div onClick={handleSubmit} className={styles.commentEmoji}>
        <i className="fa-solid fa-circle-arrow-up"></i>
      </div>
    </div>
  );
};

export default FeedCommentInput;
