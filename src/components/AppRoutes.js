import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Header from "./Header";
import Footer from "./Footer";

const AppRoutes = ({ isLoggedIn, setIsLoggedIn, nowUser, user, setUser }) => {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLoggedIn && <Header />}
        <Routes>
          {!isLoggedIn ? (
            <Route path="/" element={<Login />} />
          ) : (
            <>
              <Route
                path="/"
                element={
                  <Home nowUser={nowUser} user={user} setUser={setUser} />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    setIsLoggedIn={setIsLoggedIn}
                    user={user}
                    setUser={setUser}
                    nowUser={nowUser}
                  />
                }
              />
            </>
          )}
        </Routes>
        {isLoggedIn && <Footer />}
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
