import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileFeedList from "../components/Profile/ProfileFeedList";
import ProfileEdit from "../components/Profile/ProfileEdit";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileUser } from "../fireUtil";
import BackDrop from "../layouts/BackDrop";
import ReactDom from "react-dom";
import Loading from "../components/Loading";

const Profile = ({ nowUser, setNowUser }) => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [profileFeedList, setProfileFeedList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const portalElement = document.getElementById("layout");
  const navigate = useNavigate();

  const handleOpenEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  /* 프로필 정보 가져오기 */
  useEffect(() => {
    setLoading(true);
    const fetchProfileUser = async () => {
      try {
        const response = await getProfileUser(userId, setProfileFeedList);
        if (!response) {
          window.alert("탈퇴한 회원입니다.");
          navigate("/");
        }
        setProfileUser(response);
      } catch (error) {
        console.error("프로필 정보 불러오기 오류", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileUser();
  }, [userId, nowUser]);

  return (
    <div className="flex w-full lg:w-[1050px] my-16 px-auto flex-col relative">
      {loading ? (
        <Loading />
      ) : (
        <>
          <ProfileInfo
            profileUser={profileUser}
            nowUser={nowUser}
            profileFeedList={profileFeedList}
            setIsEditOpen={setIsEditOpen}
          />
          <ProfileFeedList profileFeedList={profileFeedList} />
        </>
      )}
      {isEditOpen && (
        <>
          {ReactDom.createPortal(
            <div className="flex justify-center">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <BackDrop toggle={setIsEditOpen} />
                  <ProfileEdit
                    nowUser={nowUser}
                    setNowUser={setNowUser}
                    setIsEditOpen={setIsEditOpen}
                    handleOpenEdit={handleOpenEdit}
                    setLoading={setLoading}
                  />
                </>
              )}
            </div>,
            portalElement
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
