import { useEffect, useState } from "react";
import Feed from "./Feed";
import { getFeeds } from "../fireUtil";
import Loading from "./Loading";

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
    list = <Loading />;
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
    <div
      id="feedList"
      className="w-full lg:w-[1050px] relative flex flex-col justify-center items-center py-16"
    >
      {list}
    </div>
  );
};

export default FeedList;
