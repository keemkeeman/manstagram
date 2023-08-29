import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileFeedList from "../components/Profile/ProfileFeedList";
import ProfileEdit from "../components/Profile/ProfileEdit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileUser } from "../fireUtil";
import BackDrop from "../layouts/BackDrop";
import ReactDom from "react-dom";

const Profile = ({ setIsLoggedIn, nowUser, setNowUser }) => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [profileFeedList, setProfileFeedList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const portalElement = document.getElementById("layout");

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
    <div className="flex w-full lg:w-[1050px] my-16 px-auto flex-col relative">
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
        <>
          {ReactDom.createPortal(
            <div className="flex justify-center">
              <BackDrop toggle={setIsEditOpen} />
              <ProfileEdit
                setIsLoggedIn={setIsLoggedIn}
                nowUser={nowUser}
                setNowUser={setNowUser}
                setIsEditOpen={setIsEditOpen}
                handleOpenEdit={handleOpenEdit}
              />
            </div>,
            portalElement
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
