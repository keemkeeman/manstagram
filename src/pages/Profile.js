import styles from "./Profile.module.css";
import ProfileInfo from "../components/Profile/ProfileInfo";

const Profile = ({ setIsLoggedIn, nowUser, setNowUser }) => {
  return (
    <div className={styles.wrap}>
      <ProfileInfo
        nowUser={nowUser}
        setIsLoggedIn={setIsLoggedIn}
        setNowUser={setNowUser}
      />
    </div>
  );
};

export default Profile;
