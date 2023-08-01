import ProfileFeed from "./ProfileFeed";
import styles from "./ProfileFeedList.module.css";

const ProfileFeedList = ({ profileFeedList }) => {
  const newList = profileFeedList.map((feed) => (
    <div key={feed.id}>
      <ProfileFeed feed={feed} />
    </div>
  ));

  return <div className={styles.wrap}>{newList}</div>;
};

export default ProfileFeedList;
