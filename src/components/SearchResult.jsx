import { useNavigate } from "react-router-dom";
import defaultImage from "../images/defaultImage.jpg";

const SearchResult = ({ searchResult, setSearchResult, setSearchInput }) => {
  const navigate = useNavigate();

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
      className="cursor-pointer flex flex-row gap-3 items-center hover:font-bold"
      key={user.id}
    >
      <div className="w-14 h-14 overflow-hidden shadow-sm rounded-full relative">
        <img
          className="w-full h-full absolute"
          src={
            user.profilePicUrl.length > 0 ? user.profilePicUrl : defaultImage
          }
          alt="profilePic"
        />
      </div>
      <div className="text-xl">{user.nickName}</div>
    </div>
  ));

  return (
    <div className="absolute border top-16 w-full flex flex-col gap-3 px-5 py-3 shadow-md rounded-md bg-neutral-100">
      {resultList}
    </div>
  );
};

export default SearchResult;
