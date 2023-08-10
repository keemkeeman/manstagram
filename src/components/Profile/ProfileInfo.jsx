const ProfileInfo = ({
  nowUser,
  profileUser,
  profileFeedList,
  setIsEditOpen,
}) => {
  const defaultImgUrl =
    "https://firebasestorage.googleapis.com/v0/b/manstagram-77636.appspot.com/o/38bEHAI7i494M9oxAHWG%2Fhuman-icon-png-2.jpg?alt=media&token=f85ab951-df2e-4144-8256-f72028c7cf32";

  const n = 10;

  return (
    <div className="flex shadow-md flex-row p-10">
      <div className="m-3 w-[150px] h-[150px] overflow-hidden shadow-sm rounded-full relative">
        <img
          className="w-[150px] h-[150px] m-0 p-0 absolute"
          src={
            profileUser.profilePicUrl !== ""
              ? profileUser.profilePicUrl
              : defaultImgUrl
          }
          alt="profilePic"
        />
      </div>
      <div className="mx-5 mt-1 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-2xl">{profileUser.nickName}</div>
          {profileUser.id === nowUser.id && (
            <div
              onClick={() => {
                setIsEditOpen((prev) => !prev);
              }}
              className="text-xl cursor-pointer"
            >
              <i className="fa-solid fa-gear"></i>
            </div>
          )}
        </div>
        <div className="flex gap-3 text-md">
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
        <div className="text-md">{profileUser.introduction}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
