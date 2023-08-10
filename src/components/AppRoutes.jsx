import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Header from "./Header";
import Footer from "./Footer";

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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="relative flex flex-col items-center bg-neutral-100">
        <Routes>{homeRoutes}</Routes>
        {isLoggedIn && (
          <>
            <Header />
            <Footer setOpenForm={setOpenForm} nowUser={nowUser} />
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
