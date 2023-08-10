import ProfileFeed from "./ProfileFeed";

const ProfileFeedList = ({ profileFeedList }) => {
  const newList = profileFeedList.map((feed) => (
    <ProfileFeed key={feed.id} feed={feed} />
  ));

  return (
    <div className="relative shadow-md grid grid-cols-3 gap-1 w-full min-h-[600px]">
      {newList}
    </div>
  );
};

export default ProfileFeedList;
