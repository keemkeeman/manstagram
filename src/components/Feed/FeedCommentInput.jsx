import { createComment } from "../../fireUtil";

const FeedCommentInput = ({
  feed,
  comments,
  setComments,
  nowUser,
  commentText,
  setCommentText,
  setCommentCounts,
}) => {
  const handleComment = (e) => {
    setCommentText(e.target.value);
  };

  /* 댓글 등록 */
  const handleSubmit = async () => {
    if (commentText === "") {
      window.alert("1자 이상은 필수입니다.");
    } else {
      const newComment = await createComment(commentText, nowUser, feed);
      setComments([newComment, ...comments]);
      setCommentCounts((prev) => prev + 1);
      setCommentText("");
    }
  };

  return (
    <div className="mt-5 flex">
      <input
        id="commentInput"
        value={commentText}
        className="flex-1 outline-none bg-transparent text-lg text-neutral-500"
        placeholder="댓글 달기..."
        onChange={handleComment}
      />
      <div onClick={handleSubmit} className="text-xl cursor-pointer">
        <i className="fa-solid fa-circle-arrow-up"></i>
      </div>
    </div>
  );
};

export default FeedCommentInput;
