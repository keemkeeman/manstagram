import { useState, useEffect } from "react";
import AppRoutes from "./components/AppRoutes";
import { auth } from "./firebase";
import { getUser } from "./fireUtil";
import styles from "./App.module.css";
import FeedForm from "./components/FeedForm";
import "./index.css"; // 임포트 꼭 하자! 

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nowUser, setNowUser] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [feedList, setFeedList] = useState([]);
  const [fileUrl, setFileUrl] = useState("");

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

  console.log("app rander");

  return (
    <div>
      {init ? (
        <>
          <AppRoutes
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            nowUser={nowUser}
            setNowUser={setNowUser}
            setOpenForm={setOpenForm}
            feedList={feedList}
            setFeedList={setFeedList}
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
          />
          {openForm && (
            <FeedForm
              nowUser={nowUser}
              feedList={feedList}
              setFeedList={setFeedList}
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
              setOpenForm={setOpenForm}
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
