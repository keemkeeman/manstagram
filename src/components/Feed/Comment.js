import { useEffect, useState } from "react";
import styles from "./Comment.module.css";
import {
  editComment,
  deleteComment,
  getReplies,
  updateReplyComment,
} from "../../fireUtil";
import { Link } from "react-router-dom";
import ReplyComment from "./ReplyComment";

const Comment = ({
  comment,
  comments,
  setComments,
  nowUser,
  replyInit,
  setReplyInit,
  momComment,
  setMomComment,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(
    comment.commentText
  );
  const [hasReplies, setHasReplies] = useState(true);
  const validUser = comment.creatorId === nowUser.id;
  const [replies, setReplies] = useState([]);
  const [replyCommentText, setReplyCommentText] = useState("");

  const handleComment = (e) => {
    setReplyCommentText(e.target.value);
  };

  const handleEditSwitch = () => {
    setIsEditOpen((prev) => !prev);
    setEditedCommentText(comment.commentText);
  };

  const handleReply = () => {
    setReplyInit(true);
    setMomComment(comment);
  };

  /* 대댓글 생성 */
  const submitReply = async () => {
    const newReplies = await updateReplyComment(
      momComment,
      replyCommentText,
      nowUser
    );
    setReplies(newReplies);
    setReplyInit(false);
  };

  /* 대댓글 가져오기 */
  useEffect(() => {
    const fetchReplyComment = async () => {
      const commentRepliesList = await getReplies(comment, setReplies, nowUser);
      setReplies(commentRepliesList);
    };
    fetchReplyComment();
  }, [comment, nowUser]);

  console.log(replies);

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
        <Link to={`/profile/${comment.creatorId}`} className={styles.nickName}>
          {comment.nickName}
        </Link>
        {isEditOpen && (
          <input
            className={styles.commentTextInput}
            value={editedCommentText}
            onChange={(e) => {
              setEditedCommentText(e.target.value);
            }}
          />
        )}
        <span className={styles.commentText}>{comment.commentText}</span>
      </span>
      {replyInit && (
        <>
          <input
            className={styles.replyInput}
            value={replyCommentText}
            onChange={handleComment}
          />
          <div onClick={submitReply} className={styles.editIcon}>
            <i className="fa-solid fa-circle-arrow-up"></i>
          </div>
        </>
      )}
      {hasReplies &&
        replies.map((reply) => (
          <ReplyComment key={reply.id} nowUser={nowUser} reply={reply} />
        ))}
      {!validUser ? (
        <div onClick={handleReply} className={styles.editIcon}>
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
  );
};

export default Comment;
