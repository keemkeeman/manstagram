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
  const homeRoutes = !isLoggedIn ? (
    <Route path="/" element={<Login />} />
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
        path="/profile/:userId"
        element={
          <Profile
            setIsLoggedIn={setIsLoggedIn}
            nowUser={nowUser}
            setNowUser={setNowUser}
          />
        }
      />
    </>
  );

  return (
    <div className="w-100 relative flex">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLoggedIn && <Header />}
        <div className="sm:w-[50vh] lg:w-[100vh]">
          <Routes>{homeRoutes}</Routes>
        </div>
        {isLoggedIn && <Footer setOpenForm={setOpenForm} nowUser={nowUser} />}
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
