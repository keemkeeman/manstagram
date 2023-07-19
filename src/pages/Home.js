import FeedForm from "../components/FeedForm";
import FeedList from "../components/FeedList";
import { getUser } from "../fireUtil";
import { useState, useEffect } from "react";

const Home = ({ nowUser, user, setUser }) => {
  const [feedList, setFeedList] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    getUser(nowUser, setUser);
  }, [nowUser, setUser]);
  console.log("rander");

  return (
    <div>
      <h2>Home</h2>
      <FeedForm
        user={user}
        nowUser={nowUser}
        feedList={feedList}
        setFeedList={setFeedList}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
      />
      <FeedList
        nowUser={nowUser}
        feedList={feedList}
        setFeedList={setFeedList}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
      />
    </div>
  );
};

export default Home;
