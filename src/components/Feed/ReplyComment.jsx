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
    <>
      <div className="flex text-3xl">
        <div className="flex-1 mr-3">
          {/* 닉네임 */}
          <Link to={`/profile/${reply.creatorId}`} className="font-bold">
            {reply.nickName}
          </Link>

          {/* 텍스트 수정 */}
          {isEditOpen ? (
            <input
              className="pl-3 border"
              value={editedReplyText}
              onChange={(e) => {
                setEditedReplyText(e.target.value);
              }}
            />
          ) : (
            <span className="pl-3">{reply.commentText}</span>
          )}
        </div>

        {/* 수정 or 댓글 버튼 */}
        {!validUser ? (
          <div
            onClick={() => {
              setRereplyInit((prev) => !prev);
            }}
            className="text-3xl text-neutral-500"
          >
            <i className="fa-solid fa-reply"></i>
          </div>
        ) : (
          !isEditOpen && (
            <div
              onClick={handleEditSwitch}
              className="text-3xl text-neutral-500"
            >
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          )
        )}

        {/* 수정 내부 버튼 */}
        {isEditOpen && (
          <div className="flex gap-3">
            <button className="hover:font-bold" onClick={handleEditReplyText}>
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
      {rereplyInit && (
        <div className="flex gap-3 ml-5">
          ㄴ<input
            className="flex-1 border-2"
            value={rereplyText}
            onChange={(e) => {
              setRereplyText(e.target.value);
            }}
            placeholder="댓글을 작성해주세요."
            maxLength={100}
          />
          <div onClick={submitReply} className="text-3xl">
            <i className="fa-solid fa-circle-arrow-up"></i>
          </div>
          <div
            onClick={() => {
              setRereplyInit(false);
            }}
            className="text-3xl"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </>
  );
};
export default ReplyComment;
