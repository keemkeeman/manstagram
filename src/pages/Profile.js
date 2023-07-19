import { Link } from "react-router-dom";
import { useState } from "react";
import { logOut, updateUser, deleteAccount } from "../fireUtil";
import { useNavigate } from "react-router-dom";

const Profile = ({ setIsLoggedIn, user, setUser, nowUser }) => {
  const [nic, setNic] = useState(user.nickName);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  console.log("유저아이디" + user.id);

  const handleLogout = () => {
    logOut();
    setIsLoggedIn(false);
  };

  const handleNic = (e) => {
    setNic(e.target.value);
  };

  const handleOpenEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    updateUser(user, nic);
    setUser((prev) => ({ ...prev, nickName: nic }));
    setIsEditOpen(false);
  };

  const handleDeleteAccount = () => {
    deleteAccount(user);
    navigate("/");
  };

  return (
    <div>
      <h2>Profile</h2>
      <span>{`welcome ${user.nickName}`}</span>
      {!isEditOpen && <button onClick={handleOpenEdit}>회원정보 수정</button>}
      {isEditOpen && (
        <>
          <form onSubmit={handleEditProfile}>
            <label>닉네임 수정</label>
            <input
              type="text"
              maxLength={10}
              placeholder="10자 이내 작성"
              onChange={handleNic}
            />
            <input type="submit" value="수정" />
          </form>
          <button onClick={handleOpenEdit}>취소</button>
          <button onClick={handleDeleteAccount}>회원탈퇴</button>
        </>
      )}
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default Profile;
