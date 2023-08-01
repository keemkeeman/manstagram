import styles from "./ProfileFeed.module.css";

const ProfileFeed = ({ feed }) => {
  return (
    <div className={styles.wrap}>
      <img className={styles.img} src={feed.imgUrl} alt="feedImg" />
    </div>
  );
};

export default ProfileFeed;
