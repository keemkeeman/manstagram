import styles from "./FeedTop.module.css";
import { Link } from "react-router-dom";

const FeedTop = ({ feed, validUser, setIsEditOpen }) => {
  const handleEditOpen = () => {
    setIsEditOpen((prev) => !prev);
  };
  return (
    <div className={styles.top}>
      <Link to={`/profile/${feed.creatorId}`} className={styles.profilePic}>
        <img src={feed.imgUrl} alt="profilePic" />
      </Link>
      <div className={styles.nicWrap}>
        <Link to={`/profile/${feed.creatorId}`} className={styles.nickName}>
          {feed.nickName}
        </Link>
        <span>•</span>
        <span>2시간</span>
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
