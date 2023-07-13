import FeedForm from "../components/FeedForm";
import FeedList from "../components/FeedList";

const Home = ({ nowUser }) => {
  return (
    <div>
      <h2>Home</h2>
      <FeedForm nowUser={nowUser} />
      <FeedList />
    </div>
  );
};

export default Home;
