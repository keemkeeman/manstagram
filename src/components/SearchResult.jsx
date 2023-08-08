import styels from "./SearchResult.module.css";
import { useNavigate } from "react-router-dom";

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
      className={styels.innerWrap}
      key={user.id}
    >
      <div className={styels.profilePicWrap}>
        <div className={styels.profilePic}>
          <img src={user.profilePicUrl} alt="profilePic" />
        </div>
      </div>
      <div className={styels.nickName}>{user.nickName}</div>
    </div>
  ));

  return <div className={styels.wrap}>{resultList}</div>;
};

export default SearchResult;
