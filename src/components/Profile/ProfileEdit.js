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
  const handleEditProfile = (e) => {
    e.preventDefault();
    updateUser(
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
    }));
    setIsEditOpen(false);
  };

  /* 유저 삭제 */
  const handleDeleteAccount = () => {
    deleteAccount();
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handleEditProfile}>
        <div>
          <label className="edit-title">닉네임 수정</label>
          <input
            type="text"
            maxLength={10}
            placeholder="10자 이내 작성"
            onChange={handleNic}
          />
        </div>
        <div>
          <label className="edit-title">프로필 사진 수정</label>
          <input type="file" onChange={null} />
        </div>
        <div>
          <label className="edit-title">소개글 수정</label>
          <input
            type="text"
            maxLength={100}
            placeholder="100자 이내 작성"
            onChange={handleIntroduction}
          />
        </div>
        <div>
          <label className="edit-title">휴대폰 번호 수정</label>
          <input type="text" onChange={null} />
        </div>
        <input type="submit" value="수정" />
      </form>
      <button onClick={handleOpenEdit}>취소</button>
      <button onClick={handleDeleteAccount}>회원탈퇴</button>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </>
  );
};

export default ProfileEdit;
