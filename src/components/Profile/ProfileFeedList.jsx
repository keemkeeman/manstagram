import ProfileFeed from "./ProfileFeed";

const ProfileFeedList = ({ profileFeedList }) => {
  const newList = profileFeedList.map((feed) => (
    <ProfileFeed key={feed.id} feed={feed} />
  ));

  return (
    <div className="relative shadow-md grid grid-cols-3 gap-1 w-full h-full">
      {newList.length > 0 ? newList : <p className="text-xl text-neutral-500">nothing on your feed...</p>}
    </div>
  );
};

export default ProfileFeedList;
