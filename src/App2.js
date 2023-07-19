import { useState, useEffect } from "react";
import AppRoutes from "./components/AppRoutes";
import { auth } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nowUser, setNowUser] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        console.log("login");
        setIsLoggedIn(true);
        setNowUser(loggedUser);
      } else {
        console.log("logout");
        setIsLoggedIn(false);
        setNowUser(null);
      }
      setInit(true);
    });
  }, []);
  console.log(auth.currentUser)

  return (
    <div className="App">
      {init ? (
        <AppRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          nowUser={nowUser}
          user={user}
          setUser={setUser}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
