import styles from "./FeedTop.module.css";

const FeedTop = ({ feed, validUser, setIsEditOpen }) => {
  const handleEditOpen = () => {
    setIsEditOpen((prev) => !prev);
  };
  return (
    <div className={styles.top}>
      <div className={styles.profilePic}>
        <img src={feed.imgUrl} alt="profilePic" />
      </div>
      <div className={styles.nicWrap}>
        <div className={styles.nickName}>{feed.nickName}</div>
        <span>•</span>
        <span>2시간</span>
      </div>
      {validUser ? (
        <div className={styles.editIcon} onClick={handleEditOpen}>
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FeedTop;
