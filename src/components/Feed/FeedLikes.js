import styles from "./FeedLikes.module.css";
const n = "234";

const FeedLikes = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.likes}>좋아요 {n}개</div>
    </div>
  );
};
export default FeedLikes;
