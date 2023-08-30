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
  const [nic, setNic] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(nowUser.profilePicUrl);
  const [introduction, setIntroduction] = useState("");
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

  const handlePhone = (e) => {
    setPhoneNumber(e.target.value);
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
    <div className="fixed flex flex-col rounded-xl shadow-lg m-16 py-10 z-50 bg-white">
      <div className="flex flex-row text-3xl items-end justify-between border-b-2 p-5">
        <button
          className="p-5 font-bold hover:text-rose-500"
          onClick={handleOpenEdit}
        >
          취소
        </button>
        <h3 className="font-bold text-4xl p-5">프로필 편집</h3>
        <button
          className="p-5 font-bold hover:text-blue-700 text-blue-500"
          onClick={handleEditProfile}
        >
          완료
        </button>
      </div>
      <div className="flex flex-col gap-14 p-5 my-5 text-2xl">
        <div className="flex flex-row">
          <label className="font-semibold w-[200px]">닉네임</label>
          <input
            className="w-full border p-3"
            type="text"
            maxLength={10}
            placeholder="10자 이내 작성"
            onChange={handleNic}
          />
        </div>
        <div className="flex flex-row">
          <label className="font-semibold w-[200px]">프로필 사진</label>
          <input
            className="w-full"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
        </div>
        <div className="flex flex-row">
          <label className="font-semibold w-[200px]">소개</label>
          <textarea
            className="w-full h-[200px] border p-3"
            type="text"
            maxLength={100}
            placeholder="100자 이내 작성"
            onChange={handleIntroduction}
          />
        </div>
        <div className="flex flex-row">
          <label className="font-semibold w-[200px]">휴대폰 번호</label>
          <input
            className="w-full border p-3"
            placeholder="'-' 포함 하여 작성"
            type="text"
            onChange={handlePhone}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-14 my-10 text-2xl">
        <Link
          to="/"
          onClick={handleLogout}
          className="text-md text-neutral-700 hover:text-rose-500"
        >
          로그아웃
        </Link>
        <Link
          to="/"
          onClick={handleDeleteAccount}
          className="text-md text-neutral-500 hover:text-rose-500"
        >
          회원탈퇴
        </Link>
      </div>
    </div>
  );
};

export default ProfileEdit;
