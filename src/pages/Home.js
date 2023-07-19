import FeedForm from "../components/FeedForm";
import FeedList from "../components/FeedList";
import { getUser } from "../fireUtil";
import { useState, useEffect } from "react";

const Home = ({ nowUser, setNowUser }) => {
  const [feedList, setFeedList] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    getUser(setNowUser);
  }, [setNowUser]);
  console.log("home rander");

  return (
    <div>
      <h2>Home</h2>
      <FeedForm
        nowUser={nowUser}
        feedList={feedList}
        setFeedList={setFeedList}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
      />
      <FeedList
        feedList={feedList}
        setFeedList={setFeedList}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
      />
    </div>
  );
};

export default Home;
