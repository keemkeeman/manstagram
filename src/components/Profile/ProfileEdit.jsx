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

  /* 이미지 url 생성 */
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
    setIsEditOpen(false);
  };

  /* 유저 삭제 */
  const handleDeleteAccount = () => {
    deleteAccount();
    navigate("/");
  };

  return (
    <div className="absolute rounded-md shadow-lg top-10 z-50 bg-neutral-50">
      <div className="flex flex-col p-10 items-center">
        <div className="flex text-lg justify-between items-end w-full border-b-2 pb-5">
          <button className="hover:font-bold" onClick={handleOpenEdit}>
            취소
          </button>
          <h3 className="font-bold text-2xl">프로필 편집</h3>
          <button
            className="hover:font-bold text-blue-700"
            onClick={handleEditProfile}
          >
            완료
          </button>
        </div>
        <div className="flex flex-col gap-10 py-5 text-lg">
          <div className="flex gap-3">
            <label className="font-semibold w-[100px]">닉네임</label>
            <input
              className="w-[320px]"
              type="text"
              maxLength={10}
              placeholder="10자 이내 작성"
              onChange={handleNic}
            />
          </div>
          <div className="flex gap-3">
            <label className="font-semibold w-[100px]">프로필 사진</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
          <div className="flex gap-3">
            <label className="font-semibold w-[100px]">소개</label>
            <textarea
              className="w-[320px]"
              type="text"
              maxLength={100}
              placeholder="100자 이내 작성"
              onChange={handleIntroduction}
            />
          </div>
          <div className="flex gap-3">
            <label className="font-semibold w-[100px]">휴대폰 번호</label>
            <input className="w-[320px]" type="text" onChange={null} />
          </div>
        </div>
        <div className="flex flex-col gap-10 my-10">
          <Link
            to="/"
            onClick={handleLogout}
            className="text-md text-neutral-700"
          >
            로그아웃
          </Link>
          <Link
            to="/"
            onClick={handleDeleteAccount}
            className="text-md text-neutral-500"
          >
            회원탈퇴
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
