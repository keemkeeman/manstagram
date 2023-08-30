import { useState, useEffect } from "react";
import AppRoutes from "./components/AppRoutes";
import { auth } from "./firebase";
import { getUser } from "./fireUtil";
import "./index.css"; // 임포트 꼭 하자!
import Loading from "./components/Loading";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nowUser, setNowUser] = useState([]);
  const [feedList, setFeedList] = useState([]);

  /* 로그인 정보 받아오기 */
  useEffect(() => {
    auth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        console.log("login");
        setIsLoggedIn(true);
        getUser(setNowUser);
      } else {
        console.log("logout");
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  
  console.log("rander")

  return (
    <>
      {init ? (
        <AppRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          nowUser={nowUser}
          setNowUser={setNowUser}
          feedList={feedList}
          setFeedList={setFeedList}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
