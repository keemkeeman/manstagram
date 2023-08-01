import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerWrap}>
      <div className={styles.headerInnerWrap}>
        <div className={styles.logo}>
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
                  <input name="search" type="text" placeholder="검색" />
                </div>
              </div>
            </div>
            {null && <div>search list...</div>}
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
