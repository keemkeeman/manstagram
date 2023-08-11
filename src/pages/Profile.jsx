import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileFeedList from "../components/Profile/ProfileFeedList";
import ProfileEdit from "../components/Profile/ProfileEdit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileUser } from "../fireUtil";

const Profile = ({ setIsLoggedIn, nowUser, setNowUser }) => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [profileFeedList, setProfileFeedList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpenEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  /* 프로필 정보 가져오기 */
  useEffect(() => {
    const fetchProfileUser = async () => {
      setProfileUser(await getProfileUser(userId, setProfileFeedList));
    };
    fetchProfileUser();
  }, [nowUser.id, profileUser.id, userId]);

  return (
    <div className="flex w-[670px] my-3 pb-[10vh] flex-col relative top-[10vh]">
      <ProfileInfo
        profileUser={profileUser}
        nowUser={nowUser}
        setIsLoggedIn={setIsLoggedIn}
        setNowUser={setNowUser}
        profileFeedList={profileFeedList}
        setIsEditOpen={setIsEditOpen}
      />
      <ProfileFeedList profileFeedList={profileFeedList} />
      {isEditOpen && (
        <div className="flex justify-center">
          <div
            id="modal-bg"
            className={`absolute top-0 w-full h-full bg-black opacity-50 inset-0 rounded-lg`}
          ></div>
          <ProfileEdit
            setIsLoggedIn={setIsLoggedIn}
            nowUser={nowUser}
            setNowUser={setNowUser}
            setIsEditOpen={setIsEditOpen}
            handleOpenEdit={handleOpenEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
