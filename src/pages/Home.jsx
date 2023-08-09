import FeedList from "../components/FeedList";
import styles from "./Home.module.css";

const Home = ({ nowUser, feedList, setFeedList, fileUrl, setFileUrl }) => {
  return (
    <div className="bg-neutral-200 flex justify-center relative top-[10vh] z-0">
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
