import { Link } from "react-router-dom";

const FeedDescription = ({ feed }) => {
  return (
    <div className="flex mx-5 mt-2 text-2xl gap-2">
      <Link to={`/profile/${feed.creatorId}`} className="font-semibold">
        {feed.nickName}
      </Link>
      <span>{feed.feedText}</span>
    </div>
  );
};

export default FeedDescription;
