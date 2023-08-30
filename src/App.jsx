import { useState, useEffect } from "react";
import AppRoutes from "./components/AppRoutes";
import { auth } from "./firebase";
import { getUser } from "./fireUtil";
import "./index.css"; // 임포트 꼭 하자!
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(false);
  const [nowUser, setNowUser] = useState({});
  const [feedList, setFeedList] = useState([]);

  /* 로그인 정보 받아오기 */
  useEffect(() => {
    setLoading(true);
    try {
      auth.onAuthStateChanged(async (loggedUser) => {
        if (loggedUser) {
          console.log("login");
          const response = await getUser(loggedUser);
          setNowUser(response);
        } else {
          console.log("logout");
          setNowUser(null);
        }
      });
    } catch (error) {
      console.error("로그인 정보 가져오기 에러", error);
    } finally {
      setLoading(false);
    }
  }, []);
  console.log("rander");

  return (
    <>
      {!loading ? (
        <AppRoutes
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
