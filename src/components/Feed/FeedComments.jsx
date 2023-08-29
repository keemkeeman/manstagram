import Comment from "./Comment";
import FeedCommentInput from "./FeedCommentInput";
import { useEffect, useState } from "react";
import { getComments, getCommentCount } from "../../fireUtil";

const FeedComments = ({ feed, nowUser, inputRef }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [openAllComments, setOpenAllComments] = useState(false);
  const [commentCount, setCommentCounts] = useState(0);

  /* 댓글 읽기 (불러오기) */
  useEffect(() => {
    const fetchComments = async () => {
      const newComments = await getComments(feed, nowUser);
      setComments(newComments);
      const currentCount = await getCommentCount(feed);
      setCommentCounts(currentCount);
    };
    fetchComments();
  }, [feed, nowUser]);

  const wannaShowAll = (
    <div className=" text-neutral-500 cursor-pointer">
      {comments.length === 0 ? (
        <p>첫 댓글을 남겨보세요!</p>
      ) : (
        <p
          onClick={() => {
            setOpenAllComments(true);
          }}
        >
          댓글 {commentCount}개 모두 보기
        </p>
      )}
    </div>
  );

  const currentComment = comments.slice(0, 1);
  const commentListSwitch = openAllComments ? comments : currentComment;
  const commentList = commentListSwitch.map((comment) => (
    <Comment
      key={comment.id}
      comment={comment}
      comments={comments}
      setComments={setComments}
      nowUser={nowUser}
      feed={feed}
      setCommentCounts={setCommentCounts}
    />
  ));

  return (
    <div className="flex flex-col gap-3 mx-5 text-xl">
      {wannaShowAll}
      {commentList}
      <FeedCommentInput
        feed={feed}
        comments={comments}
        setComments={setComments}
        nowUser={nowUser}
        commentText={commentText}
        setCommentText={setCommentText}
        setCommentCounts={setCommentCounts}
        inputRef={inputRef}
      />
    </div>
  );
};

export default FeedComments;
