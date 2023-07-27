import styles from "./Profile.module.css";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileFeedList from "../components/Profile/ProfileFeedList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileUser } from "../fireUtil";

const Profile = ({ setIsLoggedIn, nowUser, setNowUser, feedList }) => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    const fetchProfileUser = async () => {
      setProfileUser(await getProfileUser(userId));
    };
    fetchProfileUser();
    if (profileUser.id === nowUser.id) {
      setIsMyProfile(true);
    }
  }, [nowUser.id, profileUser.id, userId]);

  return (
    <div className={styles.wrap}>
      <ProfileInfo
        isMyProfile={isMyProfile}
        profileUser={profileUser}
        nowUser={nowUser}
        setIsLoggedIn={setIsLoggedIn}
        setNowUser={setNowUser}
      />
      <ProfileFeedList nowUser={nowUser} feedList={feedList} />
    </div>
  );
};

export default Profile;
