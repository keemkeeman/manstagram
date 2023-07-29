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

const Comment = ({ comment, comments, setComments, nowUser, feed }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(
    comment.commentText
  );
  const validUser = comment.creatorId === nowUser.id;
  const [replies, setReplies] = useState([]);
  const [replyCommentText, setReplyCommentText] = useState("");
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
    setReplyInit(false);
  };

  /* 대댓글 가져오기 */
  useEffect(() => {
    const fetchReplyComment = async () => {
      const commentReply = await getReplies(nowUser, feed, comment);
      setReplies(commentReply);
    };
    fetchReplyComment();
  }, []);

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

  const currentTwoReplies = replies.slice(0, 2);
  const replySwitch = wannaShowAllReply ? replies : currentTwoReplies;
  const handleShowAllReply = () => {
    setWannaShowAllReply((prev) => !prev);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.outterWrap}>
        <div className={styles.momWrap}>
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
        <div className={styles.replyWrap}>
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
          {replies.length > 0 && (
            <div className={styles.sonWrap}>
              {replySwitch.map((reply) => (
                <ReplyComment key={reply.id} nowUser={nowUser} reply={reply} />
              ))}
              {
                <span
                  className={styles.commentOpen}
                  onClick={handleShowAllReply}
                >
                  {replies.length > 2 &&
                    (wannaShowAllReply ? "접기" : "모든 댓글 보기")}
                </span>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
