import { useNavigate } from "react-router-dom";

const SearchResult = ({ searchResult, setSearchResult, setSearchInput }) => {
  const navigate = useNavigate();
  const defaultImgUrl =
    "https://firebasestorage.googleapis.com/v0/b/manstagram-77636.appspot.com/o/38bEHAI7i494M9oxAHWG%2Fhuman-icon-png-2.jpg?alt=media&token=f85ab951-df2e-4144-8256-f72028c7cf32";

  const handleClick = (user) => {
    navigate(`/profile/${user.id}`);
    setSearchResult([]);
    setSearchInput("");
  };

  const resultList = searchResult.map((user) => (
    <div
      onClick={() => {
        handleClick(user);
      }}
      className="cursor-pointer flex items-center hover:font-bold"
      key={user.id}
    >
      <div className="m-2 w-9 h-9 overflow-hidden shadow-sm rounded-full relative">
        <img
          className="w-9 h-9 m-0 p-0 absolute"
          src={
            user.profilePicUrl.length > 0 ? user.profilePicUrl : defaultImgUrl
          }
          alt="profilePic"
        />
      </div>
      <div className="text-md">{user.nickName}</div>
    </div>
  ));

  return (
    <div className="absolute top-10 flex flex-col gap-3 p-2 mr-3 shadow-md  w-[300px] lg:w-[700px] rounded-md bg-neutral-200">
      {resultList}
    </div>
  );
};

export default SearchResult;
