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
    <div className="flex border flex-row p-10 gap-10 w-full">
      <div className="w-[220px] h-[220px] overflow-hidden shadow-lg rounded-full">
        <img
          className="w-full h-full"
          src={
            profileUser.profilePicUrl !== ""
              ? profileUser.profilePicUrl
              : defaultImgUrl
          }
          alt="profilePic"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-3">
          <div className="font-semibold text-3xl">{profileUser.nickName}</div>
          {profileUser.id === nowUser.id && (
            <div
              onClick={() => {
                setIsEditOpen((prev) => !prev);
              }}
              className="text-2xl cursor-pointer"
            >
              <i className="fa-solid fa-gear"></i>
            </div>
          )}
        </div>
        <div className="flex gap-3 text-lg">
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
        <div className="text-lg">{profileUser.introduction}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
