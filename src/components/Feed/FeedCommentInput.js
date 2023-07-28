import styles from "./FeedCommentInput.module.css";
import { createComment, updateReplyComment } from "../../fireUtil";
import { useEffect, useState } from "react";

const FeedCommentInput = ({
  feed,
  comments,
  setComments,
  nowUser,
  commentText,
  setCommentText,
  replyInit,
  momComment,
  nowComment,
  setNowComment,
}) => {
  const [replyCommentText, setReplyCommentText] = useState("");
  const handleComment = (e) => {
    replyInit
      ? setReplyCommentText(e.target.value)
      : setCommentText(e.target.value);
  };
  const currentComment = replyInit ? replyCommentText : commentText;

  /* 댓글 등록 */
  const handleSubmit = async () => {
    if (currentComment === "") {
      window.alert("1자 이상은 필수입니다.");
    } else {
      const newComment = await createComment(currentComment, nowUser, feed);
      setComments([newComment, ...comments]);
      if (replyInit) {
        await updateReplyComment(momComment, newComment.id);
      }
      setCommentText("");
      setReplyCommentText("");
    }
  };

  /* 대댓글 버튼 누르면 동작 */
  useEffect(() => {
    if (replyInit) {
      const inputElement = document.getElementById("commentInput");
      inputElement.focus();
      setReplyCommentText(`@${momComment.nickName} `);
    }
  }, [momComment.nickName, replyInit]);

  return (
    <div className={styles.wrap}>
      <input
        id="commentInput"
        value={currentComment}
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
