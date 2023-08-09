import { useState } from "react";
import FeedEditForm from "./FeedEditForm";
import FeedTop from "./Feed/FeedTop";
import FeedActions from "./Feed/FeedActions";
import FeedDescription from "./Feed/FeedDescription";
import FeedComments from "./Feed/FeedComments";

const Feed = ({ nowUser, validUser, feedList, setFeedList, feed }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="bg-neutral-50 shadow-md mb-10 rounded-md pb-5 w-[670px]">
      <FeedTop
        feed={feed}
        validUser={validUser}
        setIsEditOpen={setIsEditOpen}
      />
      <img
        className="max-h-[800px] w-[670px] object-fit:cover"
        src={feed.imgUrl}
        alt="feedImg"
      />
      <FeedActions feed={feed} nowUser={nowUser} />
      <FeedDescription feed={feed} />
      <FeedComments feed={feed} nowUser={nowUser} />
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
