import { useState } from "react";
import FeedEditForm from "./FeedEditForm";
import FeedTop from "./Feed/FeedTop";
import FeedActions from "./Feed/FeedActions";
import FeedDescription from "./Feed/FeedDescription";
import FeedComments from "./Feed/FeedComments";

const Feed = ({ nowUser, validUser, feedList, setFeedList, feed }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="flex relative flex-col justify-center w-full lg:w-[670px]">
      <div className="bg-neutral-50 mb-10 pb-5 rounded-md shadow-lg z-0">
        <FeedTop
          feed={feed}
          validUser={validUser}
          setIsEditOpen={setIsEditOpen}
        />
        <img
          className="max-h-[1000px] w-full lg:w-[670px] object-fit:cover shadow-sm"
          src={feed.imgUrl}
          alt="feedImg"
        />
        <FeedActions feed={feed} nowUser={nowUser} />
        <FeedDescription feed={feed} />
        <FeedComments feed={feed} nowUser={nowUser} />
      </div>
      {isEditOpen && (
        <div className="flex justify-center">
          <div
            id="modal-bg"
            className={`absolute top-0 w-full h-full bg-black opacity-50 inset-0 rounded-lg`}
          ></div>
          <FeedEditForm
            imgSrc={feed.imgUrl}
            feed={feed}
            feedList={feedList}
            setFeedList={setFeedList}
            isEditOpen={isEditOpen}
            setIsEditOpen={setIsEditOpen}
          />
        </div>
      )}
    </div>
  );
};

export default Feed;
