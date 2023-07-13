import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Feed from "./Feed";

const FeedList = () => {
  const [feedList, setFeedList] = useState([]);
  const [haveFeed, setHaveFeed] = useState(false);

  useEffect(() => {
    const getFeeds = async () => {
      const feedRef = collection(db, "feeds");
      const feedSnap = await getDocs(
        query(feedRef, orderBy("createdAt", "desc"))
      );
      if (feedSnap.docs.length !== 0) {
        setHaveFeed(true);
        const feeds = feedSnap.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setFeedList(feeds);
      } else {
        setHaveFeed(false);
      }
    };
    getFeeds();
  }, []);

  const list = feedList.map((item) => (
    <li key={item.id}>
      <Feed
        feedText={item.feedText}
        displayName={item.displayName}
        uid={item.uid}
        id={item.id}
      />
    </li>
  ));

  return <ul>{haveFeed ? list : <p>피드가 없습니다.</p>}</ul>;
};

export default FeedList;
