import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfilePic } from "../../fireUtil";
import { useState } from "react";

const FeedTop = ({ feed, validUser, setIsEditOpen }) => {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const handleEditOpen = () => {
    setIsEditOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchProfilePic = async () => {
      const profilePic = await getProfilePic(feed);
      setProfilePicUrl(profilePic);
    };
    fetchProfilePic();
  }, [feed]);

  return (
    <div className="flex py-2 items-center shadow-sm mx-5 gap-2">
      <Link
        to={`/profile/${feed.creatorId}`}
        className="w-12 h-12 overflow-hidden shadow-sm rounded-full relative"
      >
        <img
          className="w-12 h-12 m-0 p-0 absolute"
          src={profilePicUrl}
          alt="profilePic"
        />
      </Link>
      <div className="flex flex-1 items-center gap-2">
        <Link to={`/profile/${feed.creatorId}`} className="text-lg font-bold">
          {feed.nickName}
        </Link>
        <span className="text-md">•</span>
        <span className="text-md">2시간</span>
        {/* 현재 시간에서 작성일자 빼기  */}
      </div>
      {validUser ? (
        <div className="text-2xl cursor-pointer" onClick={handleEditOpen}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      ) : null}
    </div>
  );
};

export default FeedTop;
