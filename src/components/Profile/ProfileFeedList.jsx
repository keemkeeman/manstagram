import ProfileFeed from "./ProfileFeed";

const ProfileFeedList = ({ profileFeedList }) => {
  const newList = profileFeedList.map((feed) => (
    <div key={feed.id}>
      <ProfileFeed feed={feed} />
    </div>
  ));

  return <div className="bg-green-500 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10">{newList}</div>;
};

export default ProfileFeedList;
