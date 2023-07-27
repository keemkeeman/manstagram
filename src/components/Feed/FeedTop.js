import styles from "./FeedTop.module.css";
import { Link } from "react-router-dom";

const FeedTop = ({ feed, validUser, setIsEditOpen }) => {
  const handleEditOpen = () => {
    setIsEditOpen((prev) => !prev);
  };
  return (
    <div className={styles.top}>
      <Link to={`/profile/${feed.nickName}`} className={styles.profilePic}>
        <img src={feed.imgUrl} alt="profilePic" />
      </Link>
      <div className={styles.nicWrap}>
        <div className={styles.nickName}>{feed.nickName}</div>
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
