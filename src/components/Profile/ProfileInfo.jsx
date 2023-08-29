import defaultImage from "../../images/defaultImage.jpg";

const ProfileInfo = ({
  nowUser,
  profileUser,
  profileFeedList,
  setIsEditOpen,
}) => {
  const n = 10;

  return (
    <div className="flex border flex-row p-10 gap-10 w-full">
      <div className="w-[300px] h-[300px] overflow-hidden shadow-lg rounded-full">
        <img
          className="w-full h-full"
          src={
            profileUser.profilePicUrl ? profileUser.profilePicUrl : defaultImage
          }
          alt="profilePic"
        />
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-row items-center gap-5">
          <div className="font-semibold text-5xl">{profileUser.nickName}</div>
          {profileUser.id === nowUser.id && (
            <div
              onClick={() => {
                setIsEditOpen((prev) => !prev);
              }}
              className="text-4xl rounded-full shadow-sm cursor-pointer"
            >
              <i className="fa-solid fa-gear"></i>
            </div>
          )}
        </div>
        <div className="flex gap-5 text-3xl">
          <div className="flex gap-1">
            <span>게시물</span>
            <span className="font-semibold">{profileFeedList.length}</span>
          </div>
          <div className="flex gap-1">
            <span>팔로워</span>
            <span className="font-semibold">{n}</span>
          </div>
          <div className="flex gap-1">
            <span>팔로우</span>
            <span className="font-semibold">{n}</span>
          </div>
        </div>
        <div className="text-3xl">{profileUser.introduction}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
