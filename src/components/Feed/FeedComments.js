import styles from "./FeedComments.module.css";
import Comment from "./Comment";
import FeedCommentInput from "./FeedCommentInput";
import { useEffect, useState } from "react";
import { getComments } from "../../fireUtil";

const FeedComments = ({ feed, nowUser }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [openAllComments, setOpenAllComments] = useState(false);

  /* 댓글 읽기 (불러오기) */
  useEffect(() => {
    const fetchComments = async () => {
      const newComments = await getComments(feed, nowUser);
      setComments(newComments);
    };
    fetchComments();
  }, [feed, nowUser]);

  const wannaShowAll =
    comments.length === 0 ? (
      <span className={styles.commentOpen}>첫 댓글을 남겨보세요!</span>
    ) : (
      <span
        className={styles.commentOpen}
        onClick={() => {
          setOpenAllComments(true);
        }}
      >
        댓글 {comments.length}개 모두 보기
      </span>
    );

  const currentTwoComments = comments.slice(0, 2);
  const currentComments = currentTwoComments.map((comment) => (
    <Comment
      key={comment.id}
      comment={comment}
      comments={comments}
      setComments={setComments}
      commentText={commentText}
      nowUser={nowUser}
    />
  ));
  const allComments = comments.map((comment) => (
    <Comment
      key={comment.id}
      comment={comment}
      comments={comments}
      setComments={setComments}
      commentText={commentText}
      nowUser={nowUser}
    />
  ));

  return (
    <div className={styles.wrap}>
      {wannaShowAll}
      {openAllComments ? allComments : currentComments}
      <FeedCommentInput
        feed={feed}
        comments={comments}
        setComments={setComments}
        nowUser={nowUser}
        commentText={commentText}
        setCommentText={setCommentText}
      />
    </div>
  );
};

export default FeedComments;
