import LoginForm from "../components/LoginForm";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = ({ setNowUser }) => {
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Manstagram</h2>
      <LoginForm setNowUser={setNowUser} />
      <button onClick={googleLogin}>구글 로그인</button>
    </div>
  );
};

export default Login;
