import FeedForm from "../components/FeedForm";
import FeedList from "../components/FeedList";
import { useState } from "react";

const Home = ({ nowUser }) => {
  const [feedList, setFeedList] = useState([]);
  const [fileUrl, setFileUrl] = useState("");

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
