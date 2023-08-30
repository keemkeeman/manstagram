import { useEffect, useState } from "react";
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
    setCommentCounts((prev) => prev - 1);
    setIsEditOpen(false);
  };

  const currenReply = replies.slice(0, 1);
  const replySwitch = wannaShowAllReply ? replies : currenReply;
  const handleShowAllReply = () => {
    setWannaShowAllReply((prev) => !prev);
  };

  return (
    <div className="mt-5 flex flex-col relative text-3xl">
      <div className="flex">
        {/* 닉네임, 댓글 텍스트 */}
        <div className="flex-1 pr-3">
          <Link to={`/profile/${comment.creatorId}`} className="font-bold">
            {comment.nickName}
          </Link>
          {isEditOpen ? (
            <input
              className="pl-3 relative w-[400px] border"
              value={editedCommentText}
              onChange={(e) => {
                setEditedCommentText(e.target.value);
              }}
            />
          ) : (
            <span className="pl-3">{comment.commentText}</span>
          )}
        </div>

        {/* 에딧 버튼 */}
        {!validUser ? (
          <div
            onClick={() => {
              setReplyInit((prev) => !prev);
            }}
            className="text-3xl"
          >
            <i className="fa-solid fa-reply"></i>
          </div>
        ) : !isEditOpen ? (
          <div onClick={handleEditSwitch} className="text-3xl">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        ) : (
          <div className="flex flex-row gap-3">
            <button className="hover:font-bold" onClick={handleEditText}>
              수정
            </button>
            <button className="hover:font-bold" onClick={handleDelete}>
              삭제
            </button>
            <button className="hover:font-bold" onClick={handleEditSwitch}>
              취소
            </button>
          </div>
        )}
      </div>

      {/* 대댓글 작성란 */}
      {replyInit && (
        <div className="flex ml-5 gap-3 mt-3">
          ㄴ
          <input
            className="flex-1 border-2"
            value={replyCommentText}
            onChange={handleComment}
            placeholder="댓글을 작성해주세요."
            maxLength={100}
          />
          <div onClick={submitReply} className="text-3xl">
            <i className="fa-solid fa-circle-arrow-up"></i>
          </div>
          <div
            onClick={() => {
              setReplyInit(false);
            }}
            className="text-3xl"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}

      {/* 대댓글 리스트 */}
      {replies.length > 0 && (
        <div className="flex flex-col mt-5 gap-5 ml-7 relative">
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
          <div
            className="text-neutral-500 text-2xl cursor-pointer border-b pb-2 border-neutral-300 relative w-full"
            onClick={handleShowAllReply}
          >
            {replies.length > 1 && (wannaShowAllReply ? "접기" : "댓글 펼치기")}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
