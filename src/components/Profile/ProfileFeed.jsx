const ProfileFeed = ({ feed }) => {
  return (
    <img className="object-cover w-full h-full shadow-sm" src={feed.imgUrl} alt="feedImg" />
  );
};

export default ProfileFeed;
