import styles from "./ProfileInfo.module.css";
import ProfileEdit from "./ProfileEdit";
import { useState } from "react";

const ProfileInfo = ({
  setIsLoggedIn,
  nowUser,
  setNowUser,
  profileUser,
  isMyProfile,
  profileFeedList,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpenEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  const n = 10;
  return (
    <div className="bg-red-500 flex flex-row p-10">
      <div className={styles.profilePicWrap}>
        <div className={styles.profilePic}>
          <img
            src={
              isMyProfile ? nowUser.profilePicUrl : profileUser.profilePicUrl
            }
            alt="profilePic"
          />
        </div>
      </div>
      <div className={styles.infoWrap}>
        <div className={styles.nicWrap}>
          <div className={styles.nickName}>
            {isMyProfile ? nowUser.nickName : profileUser.nickName}
          </div>
          {isMyProfile && (
            <div onClick={handleOpenEdit} className={styles.editIcon}>
              <i className="fa-solid fa-gear"></i>
            </div>
          )}
        </div>
        <div className={styles.followWrap}>
          <div className={styles.followInnerWrap}>
            <span>게시물</span>
            <span className={styles.number}>{profileFeedList.length}</span>
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

export default ProfileInfo;
