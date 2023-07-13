import FeedForm from "../components/FeedForm";
import FeedList from "../components/FeedList";
import { useState } from "react";

const Home = ({ nowUser }) => {
  const [feedList, setFeedList] = useState([]);
  const [haveFeed, setHaveFeed] = useState(false);

  return (
    <div>
      <h2>Home</h2>
      <FeedForm
        nowUser={nowUser}
        feedList={feedList}
        setFeedList={setFeedList}
        setHaveFeed={setHaveFeed}
      />
      <FeedList
        nowUser={nowUser}
        feedList={feedList}
        setFeedList={setFeedList}
        haveFeed={haveFeed}
        setHaveFeed={setHaveFeed}
      />
    </div>
  );
};

export default Home;
