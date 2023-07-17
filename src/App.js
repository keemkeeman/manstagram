import { useState, useEffect } from "react";
import AppRoutes from "./components/AppRoutes";
import { auth } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nowUser, setNowUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setIsLoggedIn(true);
        setNowUser({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setNowUser(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      {init ? (
        <AppRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          nowUser={nowUser}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
