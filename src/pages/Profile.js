import { useState } from "react";
import styles from "./Profile.module.css";
import ProfileEdit from "../components/Profile/ProfileEdit";

const Profile = ({ setIsLoggedIn, nowUser, setNowUser }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpenEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  return (
    <div className={styles.wrap}>
      <h2>Profile</h2>
      <span>{`welcome ${nowUser.nickName}`}</span>
      {!isEditOpen && <button onClick={handleOpenEdit}>회원정보 수정</button>}
      {isEditOpen && (
        <ProfileEdit
          setIsLoggedIn={setIsLoggedIn}
          nowUser={nowUser}
          setNowUser={setNowUser}
          setIsEditOpen={setIsEditOpen}
          handleOpenEdit={handleOpenEdit}
        />
      )}
    </div>
  );
};

export default Profile;
