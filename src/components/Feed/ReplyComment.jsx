import styles from "./ReplyComment.module.css";
import { useState } from "react";
import { editComment, createReply, deleteComment } from "../../fireUtil";
import { Link } from "react-router-dom";

const ReplyComment = ({
  reply,
  nowUser,
  replies,
  setReplies,
  feed,
  setCommentCounts,
}) => {
  const [editedReplyText, setEditedReplyText] = useState(reply.commentText);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const validUser = reply.creatorId === nowUser.id;
  const [rereplyInit, setRereplyInit] = useState(false);
  const [rereplyText, setRereplyText] = useState(`@${reply.nickName} `);

  const handleEditSwitch = () => {
    setIsEditOpen((prev) => !prev);
  };

  /* 댓글 수정 */
  const handleEditReplyText = async () => {
    const newReplies = await editComment(reply, replies, editedReplyText);
    setReplies(newReplies);
    setIsEditOpen(false);
  };

  /* 댓글 삭제 */
  const handleDelete = async () => {
    await deleteComment(reply, replies, setReplies);
    setCommentCounts((prev) => prev - 1);
    setIsEditOpen(false);
  };

  /* 대댓글 생성 */
  const submitReply = async () => {
    const newRereply = await createReply(reply, rereplyText, nowUser, feed);
    setReplies([newRereply, ...replies]); // 이거 안해도 되지 않나
    setCommentCounts((prev) => prev + 1);
    setRereplyInit(false);
    setRereplyText(`@${reply.nickName} `);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.outterWrap}>
        <div className={styles.innerWrap}>
          {/* 닉네임 */}
          <Link to={`/profile/${reply.creatorId}`} className={styles.nickName}>
            {reply.nickName}
          </Link>

          {/* 텍스트 수정 */}
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
        </div>

        {/* 수정 or 댓글 버튼 */}
        {!validUser ? (
          <div
            onClick={() => {
              setRereplyInit((prev) => !prev);
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
        )}

        {/* 수정 내부 버튼 */}
        {isEditOpen && (
          <div>
            <button onClick={handleEditReplyText}>수정</button>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={handleEditSwitch}>취소</button>
          </div>
        )}
      </div>

      {/* 대댓글 작성란 */}
      {rereplyInit && (
        <div className={styles.replyInputWrap}>
          <input
            className={styles.replyInput}
            value={rereplyText}
            onChange={(e) => {
              setRereplyText(e.target.value);
            }}
            placeholder="댓글을 작성해주세요."
            maxLength={100}
          />
          <div onClick={submitReply} className={styles.editIcon}>
            <i className="fa-solid fa-circle-arrow-up"></i>
          </div>
          <div
            onClick={() => {
              setRereplyInit(false);
            }}
            className={styles.editIcon}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReplyComment;
