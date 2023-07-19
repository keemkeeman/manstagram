import { useState, useEffect } from "react";
import AppRoutes from "./components/AppRoutes";
import { auth } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nowUser, setNowUser] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        console.log("login");
        setIsLoggedIn(true);
      } else {
        console.log("logout");
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  console.log("로그인 유저" + auth.currentUser);

  return (
    <div className="App">
      {init ? (
        <AppRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          nowUser={nowUser}
          setNowUser={setNowUser}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
