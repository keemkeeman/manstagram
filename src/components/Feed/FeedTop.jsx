import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfilePic } from "../../fireUtil";
import { useState } from "react";
import defaultImage from "../../images/defaultImage.jpg";

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
    <div className="flex py-2 items-center shadow-sm mx-5 gap-3">
      <Link
        to={`/profile/${feed.creatorId}`}
        className="w-16 h-16 overflow-hidden shadow-md rounded-full relative"
      >
        <img
          className="w-full h-full absolute"
          src={profilePicUrl ? profilePicUrl : defaultImage}
          alt="profilePic"
        />
      </Link>
      <div className="flex flex-1 items-center gap-2 text-2xl">
        <Link to={`/profile/${feed.creatorId}`} className="font-bold">
          {feed.nickName}
        </Link>
        <span className="text-xl">•</span>
        <span className="text-xl">2시간</span>
        {/* 현재 시간에서 작성일자 빼기  */}
      </div>
      {validUser ? (
        <div className="text-3xl cursor-pointer" onClick={handleEditOpen}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      ) : null}
    </div>
  );
};

export default FeedTop;
