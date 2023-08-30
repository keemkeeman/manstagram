import { useEffect, useState } from "react";
import { getFeeds } from "../fireUtil";
import Feed from "./Feed";
import Loading from "./Loading";

const FeedList = ({ feedList, setFeedList, nowUser }) => {
  const [loading, setLoading] = useState(false);

  /* 피드 읽기 */
  useEffect(() => {
    setLoading(true);
    const fetchFeedList = async () => {
      try {
        const newFeeds = await getFeeds(nowUser);
        setFeedList(newFeeds);
      } catch (error) {
        console.error("피드 가져오기 에러", error);
      } finally {
        setLoading(false);
      }
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
        loading={loading}
        setLoading={setLoading}
      />
    ));
  }

  return (
    <div
      id="feedList"
      className="w-full lg:w-[1050px] relative flex flex-col justify-center items-center py-16"
    >
      {loading ? <Loading /> : list}
    </div>
  );
};

export default FeedList;
