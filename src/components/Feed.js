import { useState } from "react";
import styles from "./Feed.module.css";
import FeedEditForm from "./FeedEditForm";
import FeedTop from "./Feed/FeedTop";
import FeedActions from "./Feed/FeedActions";
import FeedLikes from "./Feed/FeedLikes";
import FeedDescription from "./Feed/FeedDescription";
import FeedComments from "./Feed/FeedComments";
import FeedCommentInput from "./Feed/FeedCommentInput";

const Feed = ({ feed, validUser, feedList, setFeedList }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <FeedTop
        feed={feed}
        validUser={validUser}
        setIsEditOpen={setIsEditOpen}
      />
      <img className={styles.img} src={feed.imgUrl} alt="feedImg" />
      <FeedActions />
      <FeedLikes />
      <FeedDescription feed={feed} />
      <FeedComments />
      <FeedCommentInput />
      {isEditOpen && (
        <FeedEditForm
          feed={feed}
          feedList={feedList}
          setFeedList={setFeedList}
          setIsEditOpen={setIsEditOpen}
        />
      )}
    </div>
  );
};

export default Feed;
