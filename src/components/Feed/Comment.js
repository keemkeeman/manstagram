import { useEffect, useState } from "react";
import styles from "./Comment.module.css";
import {
  editComment,
  deleteComment,
  getReplies,
  createReply,
} from "../../fireUtil";
import { Link } from "react-router-dom";
import ReplyComment from "./ReplyComment";

const Comment = ({
  comment,
  comments,
  setComments,
  nowUser,
  feed,
  setCommentCounts,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(
    comment.commentText
  );
  const validUser = comment.creatorId === nowUser.id;
  const [replies, setReplies] = useState([]);
  const [replyCommentText, setReplyCommentText] = useState(
    comment ? `@${comment.nickName} ` : ""
  );
  const [wannaShowAllReply, setWannaShowAllReply] = useState(false);
  const [replyInit, setReplyInit] = useState(false);

  const handleComment = (e) => {
    setReplyCommentText(e.target.value);
  };

  const handleEditSwitch = () => {
    setIsEditOpen((prev) => !prev);
    setEditedCommentText(comment.commentText);
  };

  /* 대댓글 생성 */
  const submitReply = async () => {
    const newReply = await createReply(
      comment,
      replyCommentText,
      nowUser,
      feed
    );
    setReplies([newReply, ...replies]); // 이거 안해도 되지 않나
    setCommentCounts((prev) => prev + 1);
    setReplyInit(false);
  };

  /* 대댓글 읽기 (불러오기) */
  useEffect(() => {
    const fetchReplyComment = async () => {
      const commentReply = await getReplies(nowUser, feed, comment);
      setReplies(commentReply);
    };
    fetchReplyComment();
  }, [comment, feed, nowUser]);

  /* 댓글 수정 */
  const handleEditText = async () => {
    const newComments = await editComment(comment, comments, editedCommentText);
    setComments(newComments);
    setIsEditOpen(false);
  };

  /* 댓글 삭제 */
  const handleDelete = async () => {
    await deleteComment(comment, comments, setComments);
    setCommentCounts((prev) => prev - 1);
    setIsEditOpen(false);
  };

  const currenReply = replies.slice(0, 1);
  const replySwitch = wannaShowAllReply ? replies : currenReply;
  const handleShowAllReply = () => {
    setWannaShowAllReply((prev) => !prev);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.outterWrap}>
        <div className={styles.momWrap}>
          {/* 닉네임, 댓글 텍스트 */}
          <span className={styles.innerWrap}>
            <Link
              to={`/profile/${comment.creatorId}`}
              className={styles.nickName}
            >
              {comment.nickName}
            </Link>
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

          {/* 에딧 버튼 */}
          {!validUser ? (
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
          )}
          {isEditOpen && (
            <div>
              <button onClick={handleEditText}>수정</button>
              <button onClick={handleDelete}>삭제</button>
              <button onClick={handleEditSwitch}>취소</button>
            </div>
          )}
        </div>

        {/* 대댓글 작성란 */}
        {replyInit && (
          <div className={styles.replyInputWrap}>
            <input
              className={styles.replyInput}
              value={replyCommentText}
              onChange={handleComment}
              placeholder="댓글을 작성해주세요."
              maxLength={100}
            />
            <div onClick={submitReply} className={styles.editIcon}>
              <i className="fa-solid fa-circle-arrow-up"></i>
            </div>
            <div
              onClick={() => {
                setReplyInit(false);
              }}
              className={styles.editIcon}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        )}

        {/* 대댓글 리스트 */}
        {replies.length > 0 && (
          <div className={styles.sonWrap}>
            {replySwitch.map((reply) => (
              <ReplyComment
                key={reply.id}
                reply={reply}
                nowUser={nowUser}
                replies={replies}
                setReplies={setReplies}
                feed={feed}
                setCommentCounts={setCommentCounts}
              />
            ))}
            <span className={styles.commentOpen} onClick={handleShowAllReply}>
              {replies.length > 1 &&
                (wannaShowAllReply ? "접기" : "댓글 펼치기")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
