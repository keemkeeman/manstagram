const ProfileFeed = ({ feed }) => {
  return (
    <img
      className="object-fit:cover aspect-square shadow-sm overflow-auto"
      src={feed.imgUrl}
      alt="feedImg"
    />
  );
};

export default ProfileFeed;
