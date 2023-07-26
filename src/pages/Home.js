import FeedList from "../components/FeedList";
import styles from "./Home.module.css";

const Home = ({ nowUser, feedList, setFeedList, fileUrl, setFileUrl }) => {
  console.log(nowUser)
  return (
    <div className={styles.wrap}>
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
