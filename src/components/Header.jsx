import { useState } from "react";
import { useEffect } from "react";
import { findUser } from "../fireUtil";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

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
    <div className="bg-neutral-50 w-full shadow-sm top-0 fixed border-b-[1px] z-10">
      <div className="flex flex-row mx-auto px-10 py-5 items-center justify-between max-w-[2000px]">
        <div className="flex-1">
          <BsInstagram
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
            size={50}
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col relative">
            <div className="flex flex-row p-3 gap-2 shadow-md items-center w-[350px] lg:w-[700px] rounded-md bg-neutral-200">
              <BiSearch className="mx-3" size={40} />
              <input
                className="bg-transparent text-xl flex-1"
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
          <AiOutlineHeart className="cursor-pointer" size={50} />
        </div>
      </div>
    </div>
  );
};

export default Header;
