import styles from "./ProfileEdit.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logOut, updateUser, deleteAccount } from "../../fireUtil";
import { useNavigate } from "react-router-dom";

const ProfileEdit = ({
  setIsLoggedIn,
  nowUser,
  setNowUser,
  setIsEditOpen,
  handleOpenEdit,
}) => {
  const [nic, setNic] = useState(nowUser.nickName);
  const [phoneNumber, setPhoneNumber] = useState(nowUser.phoneNumber);
  const [profilePicUrl, setProfilePicUrl] = useState(nowUser.profilePicUrl);
  const [introduction, setIntroduction] = useState(nowUser.introduction);
  const navigate = useNavigate();

  /* 이미지 불러오기 */
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      window.alert("올바른 이미지 파일을 선택해주세요!");
      return;
    } else {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setProfilePicUrl(e.currentTarget.result);
      };
      reader.onerror = () => {
        window.alert("이미지를 읽는 도중 오류가 발생했습니다!");
      };
      reader.readAsDataURL(file);
    }
  };

  /* 로그아웃 */
  const handleLogout = () => {
    logOut();
    setIsLoggedIn(false);
  };

  const handleNic = (e) => {
    setNic(e.target.value);
  };

  const handleIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

  /* 유저 수정 */
  const handleEditProfile = async (e) => {
    e.preventDefault();
    await updateUser(
      nowUser,
      setNowUser,
      nic,
      phoneNumber,
      profilePicUrl,
      introduction
    );
    setNowUser((prev) => ({
      ...prev,
      nickName: nic,
      introduction: introduction,
      profilePicUrl: profilePicUrl,
    }));
    setIsEditOpen(false);
  };

  /* 유저 삭제 */
  const handleDeleteAccount = () => {
    deleteAccount();
    navigate("/");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.topWrap}>
        <span onClick={handleOpenEdit}>취소</span>
        <h3>프로필 편집</h3>
        <span onClick={handleEditProfile}>완료</span>
      </div>
      <div className={styles.formWrap}>
        <div className={styles.innerWrap}>
          <label className="edit-title">닉네임 수정</label>
          <input
            type="text"
            maxLength={10}
            placeholder="10자 이내 작성"
            onChange={handleNic}
          />
        </div>
        <div className={styles.innerWrap}>
          <label className="edit-title">프로필 사진</label>
          <input type="file" onChange={handleFile} />
        </div>
        <div className={styles.innerWrap}>
          <label className="edit-title">소개</label>
          <textarea
            type="text"
            maxLength={100}
            placeholder="100자 이내 작성"
            onChange={handleIntroduction}
          />
        </div>
        <div className={styles.innerWrap}>
          <label className="edit-title">휴대폰 번호</label>
          <input type="text" onChange={null} />
        </div>
      </div>
      <Link to="/" onClick={handleLogout} className={styles.logout}>
        로그아웃
      </Link>
      <Link to="/" onClick={handleDeleteAccount} className={styles.logout}>
        회원탈퇴
      </Link>
    </div>
  );
};

export default ProfileEdit;
