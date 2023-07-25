import { useState } from "react";
import styles from "./FeedCommentInput.module.css";
import { createComment } from "../../fireUtil";

const FeedCommentInput = ({ feed, comments, setComments, nowUser }) => {
  const [commentText, setCommentText] = useState("");
  const handleComment = (e) => {
    setCommentText(e.target.value);
  };
  const handleSubmit = async () => {
    if (commentText === "") {
      window.alert("1자 이상은 필수입니다.");
    } else {
      const newComment = await createComment(commentText, nowUser, feed);
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };
  return (
    <div className={styles.wrap}>
      <input
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
