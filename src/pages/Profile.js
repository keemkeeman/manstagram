import styles from "./Profile.module.css";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileFeedList from "../components/Profile/ProfileFeedList";

const Profile = ({ setIsLoggedIn, nowUser, setNowUser, feedList }) => {
  return (
    <div className={styles.wrap}>
      <ProfileInfo
        nowUser={nowUser}
        setIsLoggedIn={setIsLoggedIn}
        setNowUser={setNowUser}
      />
      <ProfileFeedList nowUser={nowUser} feedList={feedList} />
    </div>
  );
};

export default Profile;
