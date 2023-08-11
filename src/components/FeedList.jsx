import { useEffect } from "react";
import Feed from "./Feed";
import { getFeeds } from "../fireUtil";

const FeedList = ({ feedList, setFeedList, nowUser }) => {
  /* 피드 읽기 */
  useEffect(() => {
    const fetchFeedList = async () => {
      const newFeeds = await getFeeds(nowUser);
      setFeedList(newFeeds);
    };
    fetchFeedList();
  }, [nowUser, setFeedList]);

  /* 리스트 뿌려주기 */
  let list;
  if (!feedList || feedList.length === 0) {
    list = <div>What's going on?</div>;
  } else {
    list = feedList.map((feed) => (
      <Feed
        key={feed.id}
        nowUser={nowUser}
        validUser={nowUser.id === feed.creatorId}
        feedList={feedList}
        setFeedList={setFeedList}
        feed={feed}
      />
    ));
  }

  return (
    <div className="min-h-[calc(100vh - 160px)] w-full relative flex flex-col justify-center items-center top-[10vh] my-3 pb-[10vh]">
      {list}
    </div>
  );
};

export default FeedList;
