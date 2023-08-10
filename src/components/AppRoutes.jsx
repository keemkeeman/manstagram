import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Header from "./Header";
import Footer from "./Footer";
import FeedForm from "./FeedForm";

const AppRoutes = ({
  isLoggedIn,
  setIsLoggedIn,
  nowUser,
  setNowUser,
  feedList,
  setFeedList,
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
          />
        }
      />
      <Route
        path="/upload"
        element={
          <FeedForm
            nowUser={nowUser}
            feedList={feedList}
            setFeedList={setFeedList}
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
      <div className="relative flex justify-center bg-neutral-100  max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <Routes>{homeRoutes}</Routes>
        {isLoggedIn && (
          <>
            <Header />
            <Footer nowUser={nowUser} />
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
