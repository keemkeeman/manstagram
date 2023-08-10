import FeedList from "../components/FeedList";

const Home = ({ nowUser, feedList, setFeedList }) => {
  return (
    <FeedList nowUser={nowUser} feedList={feedList} setFeedList={setFeedList} />
  );
};

export default Home;
