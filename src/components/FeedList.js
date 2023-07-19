import { useEffect } from "react";
import Feed from "./Feed";
import { getFeeds } from "../fireUtil";

const FeedList = ({ feedList, setFeedList, fileUrl, setFileUrl, nowUser }) => {
  /* 피드 읽기 */
  useEffect(() => {
    getFeeds(setFeedList);
  }, [setFeedList]);

  /* 리스트 뿌려주기 */
  const list = feedList.map((feed) => (
    <li key={feed.id}>
      <Feed
        nowUser={nowUser}
        validUser={nowUser.id === feed.creatorId}
        feedList={feedList}
        setFeedList={setFeedList}
        feed={feed}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
      />
    </li>
  ));

  return <ul>{list}</ul>;
};

export default FeedList;
