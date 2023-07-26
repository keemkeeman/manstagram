import { useState } from "react";
import { createUser, signInUser } from "../fireUtil";
import styles from "./LoginForm.module.css";

const LoginForm = ({ haveAccount }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPw, setValidPw] = useState(true);

  const handleValidEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (regex.test(e.target.value)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const handleValidPw = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (regex.test(e.target.value)) {
      setValidPw(true);
    } else {
      setValidPw(false);
    }
  };

  /* 회원 생성 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validEmail || !validPw) {
      window.alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    } else {
      createUser(email, pw);
      setEmail("");
      setPw("");
    }
  };

  /* 회원 로그인 */
  const handleLogin = async (e) => {
    e.preventDefault();
    signInUser(email, pw);
  };

  return (
    <div className={styles.wrap}>
      <form onSubmit={haveAccount ? handleLogin : handleSubmit}>
        <input
          className={styles.infoInput}
          name="email"
          onChange={handleValidEmail}
          value={email}
          placeholder="이메일"
          type="email"
        />
        {!validEmail && (
          <span className={styles.alert}>올바른 이메일을 입력해주세요.</span>
        )}
        <input
          className={styles.infoInput}
          name="password"
          onChange={handleValidPw}
          value={pw}
          placeholder="비밀번호"
          type="password"
        />
        {!validPw && (
          <span className={styles.alert}>
            영문, 숫자 조합 8자리 이상 입력해주세요.
          </span>
        )}
        <input
          className={haveAccount ? styles.login : styles.signup}
          id={styles.submit}
          type="submit"
          value={haveAccount ? "로그인" : "계정 생성"}
        />
      </form>
    </div>
  );
};

export default LoginForm;
