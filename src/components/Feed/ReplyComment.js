import styles from "./ReplyComment.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const ReplyComment = ({ nowUser, reply }) => {
  return (
    <div key={reply.id} className={styles.wrap}>
      <span className={styles.nickName}>{reply.nickName}</span>
      <span className={styles.commentText}>{reply.commentText}</span>
    </div>
  );
};
export default ReplyComment;
