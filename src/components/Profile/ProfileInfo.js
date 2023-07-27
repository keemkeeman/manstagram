import styles from "./ProfileInfo.module.css";
import ProfileEdit from "./ProfileEdit";
import { useState } from "react";

const ProfileInfo = ({
  setIsLoggedIn,
  nowUser,
  setNowUser,
  profileUser,
  isMyProfile,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpenEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  const n = 10;
  return (
    <div className={styles.wrap}>
      <div className={styles.profilePicWrap}>
        <div className={styles.profilePic}>
          <img src={profileUser.profilePicUrl} alt="profilePic" />
        </div>
      </div>
      <div className={styles.infoWrap}>
        <div className={styles.nicWrap}>
          <div className={styles.nickName}>{profileUser.nickName}</div>
          {isMyProfile && (
            <div onClick={handleOpenEdit} className={styles.editIcon}>
              <i className="fa-solid fa-gear"></i>
            </div>
          )}
        </div>
        <div className={styles.followWrap}>
          <div className={styles.followInnerWrap}>
            <span>게시물</span>
            <span className={styles.number}>{n}</span>
          </div>
          <div className={styles.followInnerWrap}>
            <span>팔로워</span>
            <span className={styles.number}>{n}</span>
          </div>
          <div className={styles.followInnerWrap}>
            <span>팔로우</span>
            <span className={styles.number}>{n}</span>
          </div>
        </div>
        <div className={styles.introductionWrap}>
          {profileUser.introduction}
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default ProfileInfo;
