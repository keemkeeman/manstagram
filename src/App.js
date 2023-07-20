import { useState, useEffect } from "react";
import AppRoutes from "./components/AppRoutes";
import { auth } from "./firebase";
import { getUser } from "./fireUtil";
import styles from "./App.module.css";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nowUser, setNowUser] = useState([]);
  const [openForm, setOpenForm] = useState(false);

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
    <div className={styles.app}>
      {init ? (
        <AppRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          nowUser={nowUser}
          setNowUser={setNowUser}
          openForm={openForm}
          setOpenForm={setOpenForm}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
