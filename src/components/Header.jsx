import { useState } from "react";
import { useEffect } from "react";
import { findUser } from "../fireUtil";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFindedUser = async () => {
      await findUser(searchInput, setSearchResult);
    };
    fetchFindedUser();
  }, [searchInput]);

  return (
    <div className="bg-neutral-50 w-full shadow-sm top-0 fixed h-[10vh] flex items-center">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="text-4xl flex-1 m-8 cursor-pointer lg:text-5xl"
      >
        <i className="fa-brands fa-instagram"></i>
      </div>

      <div className="flex items-center mr-5">
        <div className="flex flex-col">
          <div className="flex flex-row p-2 mr-3 shadow-md items-center w-[30vh] lg:w-[70vh] rounded-md bg-neutral-200">
            <div className="text-xl ml-2">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              className="bg-transparent text-md m-2 flex-1"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
              name="search"
              type="text"
              placeholder="검색"
            />
          </div>
          {searchResult.length > 0 && (
            <SearchResult
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              setSearchInput={setSearchInput}
            />
          )}
        </div>
        <div className="text-3xl m-3 cursor-pointer ">
          <i className="fa-regular fa-heart"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
