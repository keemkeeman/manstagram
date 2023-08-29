import { useRef, useState } from "react";
import FeedEditForm from "./FeedEditForm";
import FeedTop from "./Feed/FeedTop";
import FeedActions from "./Feed/FeedActions";
import FeedDescription from "./Feed/FeedDescription";
import FeedComments from "./Feed/FeedComments";

const Feed = ({ nowUser, validUser, feedList, setFeedList, feed }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const inputRef = useRef();

  return (
    <div className="bg-white flex relative flex-col justify-center w-full">
      <div className="border mb-10 pb-10 rounded-sm shadow-sm z-0 flex flex-col">
        <FeedTop
          feed={feed}
          validUser={validUser}
          setIsEditOpen={setIsEditOpen}
        />
        <div className="max-w-[1080px] max-h-[1080px] overflow-hidden">
          <img
            className="h-full w-full shadow-sm"
            src={feed.imgUrl}
            alt="feedImg"
          />
        </div>
        <div className="flex flex-col gap-3">
          <FeedActions
            feed={feed}
            nowUser={nowUser}
            inputRef={inputRef}
          />
          <FeedDescription feed={feed} />
          <FeedComments feed={feed} nowUser={nowUser} inputRef={inputRef} />
        </div>
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
