import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./AppRoutes.module.css";

const AppRoutes = ({
  isLoggedIn,
  setIsLoggedIn,
  nowUser,
  setNowUser,
  setOpenForm,
  feedList,
  setFeedList,
  fileUrl,
  setFileUrl,
}) => {
  return (
    <div className={styles.wrap}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLoggedIn && <Header />}
        <div className={styles.contentsWrap}>
          <Routes>
            {!isLoggedIn ? (
              <Route path="/" element={<Login setNowUser={setNowUser} />} />
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <Home
                      nowUser={nowUser}
                      feedList={feedList}
                      setFeedList={setFeedList}
                      fileUrl={fileUrl}
                      setFileUrl={setFileUrl}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      setIsLoggedIn={setIsLoggedIn}
                      nowUser={nowUser}
                      setNowUser={setNowUser}
                    />
                  }
                />
              </>
            )}
          </Routes>
        </div>
        {isLoggedIn && <Footer setOpenForm={setOpenForm} />}
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
