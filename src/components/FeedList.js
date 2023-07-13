import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import Feed from "./Feed";

const FeedList = ({
  nowUser,
  feedList,
  setFeedList,
  haveFeed,
  setHaveFeed,
}) => {
  /* 읽기 */
  useEffect(() => {
    const getFeeds = async () => {
      const feedRef = collection(db, "feeds");
      const feedSnap = await getDocs(
        query(feedRef, orderBy("createdAt", "desc"))
      );
      if (feedSnap.docs.length !== 0) {
        const feeds = feedSnap.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setHaveFeed(true);
        setFeedList(feeds);
      } else {
        setHaveFeed(false);
      }
    };
    getFeeds();
  }, [setFeedList, setHaveFeed]);

  const list = feedList.map((item) => (
    <li key={item.id}>
      <Feed
        feedText={item.feedText}
        displayName={item.displayName}
        validUser={nowUser.uid === item.creatorId}
        id={item.id}
        feedList={feedList}
        setFeedList={setFeedList}
        imgUrl={item.imgUrl}
      />
    </li>
  ));

  return <ul>{haveFeed ? list : <p>피드가 없습니다.</p>}</ul>;
};

export default FeedList;
