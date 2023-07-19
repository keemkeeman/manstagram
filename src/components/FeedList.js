import { useEffect } from "react";
import Feed from "./Feed";
import { getFeeds } from "../fireUtil";
import { auth } from "../firebase";

const FeedList = ({ feedList, setFeedList, fileUrl, setFileUrl }) => {
  /* 피드 읽기 */
  useEffect(() => {
    getFeeds(setFeedList);
  }, [setFeedList]);

  /* 리스트 뿌려주기 */
  const list = feedList.map((feed) => (
    <li key={feed.id}>
      <Feed
        validUser={auth.currentUser.uid === feed.creatorId}
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
