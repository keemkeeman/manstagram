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
    <div className={styles.headerWrap}>
      <div className={styles.headerInnerWrap}>
        <div
          onClick={() => {
            navigate("/");
          }}
          className={styles.logo}
        >
          <i className="fa-brands fa-instagram"></i>
        </div>
        <div className={styles.actionWrap}>
          <div className={styles.searchWrap}>
            <div className={styles.searchMainWrap}>
              <div className={styles.searchInnerWrap}>
                <div className={styles.searchIcon}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className={styles.searchBar}>
                  <input
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                    value={searchInput}
                    name="search"
                    type="text"
                    placeholder="검색"
                  />
                </div>
              </div>
            </div>
            {searchResult.length > 0 && (
              <SearchResult
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                setSearchInput={setSearchInput}
              />
            )}
          </div>
          <div className={styles.notice}>
            <i className="fa-regular fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
