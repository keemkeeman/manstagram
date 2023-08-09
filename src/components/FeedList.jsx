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
      <li key={feed.id}>
        <Feed
          nowUser={nowUser}
          validUser={nowUser.id === feed.creatorId}
          feedList={feedList}
          setFeedList={setFeedList}
          feed={feed}
        />
      </li>
    ));
  }

  return (
    <ul className="w-[80vh] flex flex-col justify-center items-center relative top-[10vh]">
      {list}
    </ul>
  );
};

export default FeedList;
