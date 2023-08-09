import FeedList from "../components/FeedList";

const Home = ({ nowUser, feedList, setFeedList, fileUrl, setFileUrl }) => {
  return (
    <FeedList
      nowUser={nowUser}
      feedList={feedList}
      setFeedList={setFeedList}
      fileUrl={fileUrl}
      setFileUrl={setFileUrl}
    />
  );
};

export default Home;
