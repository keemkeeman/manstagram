import { useState } from "react";
import styles from "./Feed.module.css";
import FeedEditForm from "./FeedEditForm";
import FeedTop from "./Feed/FeedTop";
import FeedActions from "./Feed/FeedActions";
import FeedLikes from "./Feed/FeedLikes";

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
      <div>
        <span>{feed.nickName}</span>
        <span>{feed.feedText}</span>
      </div>
      <div>comments</div>
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
