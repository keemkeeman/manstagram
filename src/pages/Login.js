import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styles from "./Login.module.css";

const Login = ({ setNowUser }) => {
  const [haveAccount, setHaveAccount] = useState(true);

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginPage = () => {
    setHaveAccount((prev) => !prev);
  };

  return (
    <>
      <div className={styles.wrap}>
        <h1 className={styles.title}>Manstagram</h1>
        <LoginForm setNowUser={setNowUser} haveAccount={haveAccount} />
        <div className={styles.and}>
          <div name="line"></div>
          <span>또는</span>
        </div>
        <div className={styles.googleIcon}>
          <i onClick={googleLogin} className="fa-brands fa-google"></i>
        </div>
      </div>
      <div className={styles.bottomWrap}>
        {haveAccount ? (
          <div>
            <p>계정이 없으신가요?</p>
            <p onClick={handleLoginPage} className={styles.chooseButton}>
              가입하기
            </p>
          </div>
        ) : (
          <div>
            <p>이미 계정이 있으신가요?</p>
            <p onClick={handleLoginPage} className={styles.chooseButton}>
              로그인하기
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
