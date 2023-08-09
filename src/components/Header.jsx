import { useState } from "react";
import styles from "./Header.module.css";
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
    <div className="bg-green-500 w-full fixed h-[8vh] flex items-center justify-between">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="font-bold text-5xl flex-1 ml-3"
      >
        <i className="fa-brands fa-instagram"></i>
      </div>

      <div className="bg-red-500 flex items-center mr-3">
        <div className="flex flex-col">
          <div className="flex flex-row items-center w-[30vh]">
            <div className="font-semibold text-2xl">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              className="bg-transparent"
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
        <div className="bg-blue-500">
          <i className="fa-regular fa-heart"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
