import styles from "./FeedComments.module.css";
import Comment from "./Comment";
import FeedCommentInput from "./FeedCommentInput";
import { useEffect, useState } from "react";
import { getComments } from "../../fireUtil";

const FeedComments = ({ feed, nowUser }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const newComments = await getComments(feed);
      setComments(newComments);
    };
    fetchComments();
  }, [feed]);

  console.log(comments);
  return (
    <div className={styles.wrap}>
      <span className={styles.commentOpen}>
        댓글 {comments.length}개 모두 보기
      </span>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <FeedCommentInput
        feed={feed}
        comments={comments}
        setComments={setComments}
        nowUser={nowUser}
      />
    </div>
  );
};

export default FeedComments;
