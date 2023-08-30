import ProfileFeed from "./ProfileFeed";

const ProfileFeedList = ({ profileFeedList }) => {
  const newList = profileFeedList.map((feed) => (
    <ProfileFeed key={feed.id} feed={feed} />
  ));

  return (
    <div className="relative grid grid-cols-3 gap-1 w-full h-full">
      {newList.length > 0 ? (
        newList
      ) : (
        <p className="absolute w-full text-3xl text-center">
          아직 게시물이 없어요😢
        </p>
      )}
    </div>
  );
};

export default ProfileFeedList;
