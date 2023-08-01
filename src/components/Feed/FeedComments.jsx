import styles from "./FeedComments.module.css";
import Comment from "./Comment";
import FeedCommentInput from "./FeedCommentInput";
import { useEffect, useState } from "react";
import { getComments, getCommentCount } from "../../fireUtil";

const FeedComments = ({ feed, nowUser }) => {
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

  const wannaShowAll =
    comments.length === 0 ? (
      <div className={styles.commentOpen}>첫 댓글을 남겨보세요!</div>
    ) : (
      <div
        className={styles.commentOpen}
        onClick={() => {
          setOpenAllComments(true);
        }}
      >
        댓글 {commentCount}개 모두 보기
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
    <div className={styles.wrap}>
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
      />
    </div>
  );
};

export default FeedComments;
