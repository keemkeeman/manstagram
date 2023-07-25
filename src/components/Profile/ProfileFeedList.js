import ProfileFeed from "./ProfileFeed";
import styles from "./ProfileFeedList.module.css";

const ProfileFeedList = ({ nowUser, feedList }) => {
  const filteredList = feedList.filter((feed) => feed.creatorId === nowUser.id);
  const newList = filteredList.map((feed) => (
    <div key={feed.id}>
      <ProfileFeed feed={feed} />
    </div>
  ));
  
  return <div className={styles.wrap}>{newList}</div>;
};

export default ProfileFeedList;
