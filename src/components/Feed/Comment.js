import { useState } from "react";
import styles from "./Comment.module.css";
import { editComment, deleteComment } from "../../fireUtil";

const Comment = ({ comment, comments, setComments, nowUser }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(
    comment.commentText
  );
  const validUser = comment.creatorId === nowUser.id;

  const handleEditSwitch = () => {
    setIsEditOpen((prev) => !prev);
    setEditedCommentText(comment.commentText);
  };

  /* 댓글 수정 */
  const handleEditText = async () => {
    const newComments = await editComment(comment, comments, editedCommentText);
    setComments(newComments);
    setIsEditOpen(false);
  };

  /* 댓글 삭제 */
  const handleDelete = async () => {
    await deleteComment(comment, comments, setComments);
    setIsEditOpen(false);
  };

  return (
    <div className={styles.wrap}>
      <span className={styles.innerWrap}>
        <span onClick={null} className={styles.nickName}>
          {comment.nickName}
        </span>
        {isEditOpen ? (
          <input
            className={styles.commentTextInput}
            value={editedCommentText}
            onChange={(e) => {
              setEditedCommentText(e.target.value);
            }}
          />
        ) : (
          <span className={styles.commentText}>{comment.commentText}</span>
        )}
      </span>
      {!isEditOpen && validUser && (
        <div onClick={handleEditSwitch} className={styles.editIcon}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      )}
      {isEditOpen && (
        <div>
          <button onClick={handleEditText}>수정</button>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleEditSwitch}>취소</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
