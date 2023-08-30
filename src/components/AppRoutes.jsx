import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Header from "./Header";
import Footer from "./Footer";
import FeedForm from "./FeedForm";

const AppRoutes = ({ nowUser, setNowUser, feedList, setFeedList }) => {
  const homeRoutes = !nowUser ? (
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
        element={<Profile nowUser={nowUser} setNowUser={setNowUser} />}
      />
    </>
  );

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="relative flex justify-center mx-auto py-20">
        <Routes>{homeRoutes}</Routes>
        {nowUser && (
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
