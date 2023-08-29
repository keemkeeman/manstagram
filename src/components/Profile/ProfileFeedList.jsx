import ProfileFeed from "./ProfileFeed";

const ProfileFeedList = ({ profileFeedList }) => {
  const newList = profileFeedList.map((feed) => (
    <ProfileFeed key={feed.id} feed={feed} />
  ));

  return (
    <div className="relative grid grid-cols-3 gap-1 w-full h-full">
      {newList.length > 0 ? newList : <p className="text-3xl ">nothing on your feed...</p>}
    </div>
  );
};

export default ProfileFeedList;
