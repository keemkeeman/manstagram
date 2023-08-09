import FeedList from "../components/FeedList";
import styles from "./Home.module.css";

const Home = ({ nowUser, feedList, setFeedList, fileUrl, setFileUrl }) => {
  return (
    <div className="bg-red-500 w-full">
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
