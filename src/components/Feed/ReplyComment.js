import styles from "./ReplyComment.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const ReplyComment = (nowUser, reply) => {
  return <div>{reply.nickName}</div>;
};
export default ReplyComment;
