import styles from "./ReplyComment.module.css";
import { useState } from "react";
import { editComment } from "../../fireUtil";

const ReplyComment = ({
  reply,
  setReplyInit,
  nowUser,
  replies,
  setReplies,
}) => {
  const [editedReplyText, setEditedReplyText] = useState(reply.commentText);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const validUser = reply.creatorId === nowUser.id;

  const handleEditSwitch = () => {
    setIsEditOpen((prev) => !prev);
  };

  /* 댓글 수정 */
  const handleEditReplyText = async () => {
    const newReplies = await editComment(reply, replies, editedReplyText);
    setReplies(newReplies);
    setIsEditOpen(false);
  };

  return (
    <div key={reply.id} className={styles.wrap}>
      <div className={styles.innerWrap}>
        {/* 닉네임 */}
        <span className={styles.nickName}>{reply.nickName}</span>
        {/* 텍스트 */}
        {isEditOpen ? (
          <input
            className={styles.commentTextInput}
            value={editedReplyText}
            onChange={(e) => {
              setEditedReplyText(e.target.value);
            }}
          />
        ) : (
          <span className={styles.commentText}>{reply.commentText}</span>
        )}
        {/* 수정 내부 버튼 */}
        {isEditOpen && (
          <div>
            <button onClick={handleEditReplyText}>수정</button>
            <button onClick={null}>삭제</button>
            <button onClick={handleEditSwitch}>취소</button>
          </div>
        )}
        {/* 수정 or 댓글 버튼 */}
        {validUser && !isEditOpen && (
          <div onClick={handleEditSwitch} className={styles.editIcon}>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        )}

        {/* {!validUser ? (
        <div
          onClick={() => {
            setReplyInit((prev) => !prev);
          }}
          className={styles.editIcon}
        >
          <i className="fa-solid fa-reply"></i>
        </div>
      ) : (
        !isEditOpen && (
          <div onClick={handleEditSwitch} className={styles.editIcon}>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        )
      )} */}
      </div>
    </div>
  );
};
export default ReplyComment;
