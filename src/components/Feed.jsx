import { useRef, useState } from "react";
import FeedEditForm from "./FeedEditForm";
import FeedTop from "./Feed/FeedTop";
import FeedActions from "./Feed/FeedActions";
import FeedDescription from "./Feed/FeedDescription";
import FeedComments from "./Feed/FeedComments";
import ReactDom from "react-dom";
import BackDrop from "../layouts/BackDrop";
import Loading from "./Loading";

const Feed = ({
  nowUser,
  validUser,
  feedList,
  setFeedList,
  feed,
  loading,
  setLoading,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const inputRef = useRef();
  const portalElement = document.getElementById("layout");

  return (
    <div className="bg-white flex relative flex-col justify-center w-full">
      {loading ? (
        <Loading />
      ) : (
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
            <FeedActions feed={feed} nowUser={nowUser} inputRef={inputRef} />
            <FeedDescription feed={feed} />
            <FeedComments feed={feed} nowUser={nowUser} inputRef={inputRef} />
          </div>
        </div>
      )}
      {isEditOpen && (
        <>
          {ReactDom.createPortal(
            <div className="flex justify-center">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <BackDrop toggle={setIsEditOpen} />
                  <FeedEditForm
                    imgSrc={feed.imgUrl}
                    feed={feed}
                    feedList={feedList}
                    setFeedList={setFeedList}
                    isEditOpen={isEditOpen}
                    setIsEditOpen={setIsEditOpen}
                    setLoading={setLoading}
                  />
                </>
              )}
            </div>,
            portalElement
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
