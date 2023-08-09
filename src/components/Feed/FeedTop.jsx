import { useEffect } from "react";
import styles from "./FeedTop.module.css";
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
    <div className="bg-red">
      <Link
        to={`/profile/${feed.creatorId}`}
        className="w-4 h-4 overflow-hidden rounded-full relative bg-red-500"
      >
        <img
          className="w-4 h-4 m-0 p-0 absolute"
          src={profilePicUrl}
          alt="profilePic"
        />
      </Link>
      <div className={styles.nicWrap}>
        <Link to={`/profile/${feed.creatorId}`} className={styles.nickName}>
          {feed.nickName}
        </Link>
        <span>•</span>
        <span>2시간</span>
        {/* 현재 시간에서 작성일자 빼기  */}
      </div>
      {validUser ? (
        <div className={styles.editIcon} onClick={handleEditOpen}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FeedTop;
