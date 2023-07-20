import styles from "./FeedActions.module.css";

const FeedActions = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.likesWrap}>
        <i class="fa-regular fa-heart"></i>
        <i class="fa-regular fa-comment"></i>
        <i class="fa-regular fa-paper-plane"></i>
      </div>
      <i class="fa-regular fa-bookmark"></i>
    </div>
  );
};
export default FeedActions;
