import { Link } from "react-router-dom";

const FeedDescription = ({ feed }) => {
  return (
    <div className="flex px-10 mt-2 text-3xl gap-5">
      <Link to={`/profile/${feed.creatorId}`} className="font-semibold">
        {feed.nickName}
      </Link>
      <span>{feed.feedText}</span>
    </div>
  );
};

export default FeedDescription;
