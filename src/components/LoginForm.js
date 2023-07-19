import { useState } from "react";
import { createUser, signInUser } from "../fireUtil";

const LoginForm = ({ setNowUser }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);

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
      createUser(email, pw, setNowUser);
      setEmail("");
      setPw("");
    }
  };

  /* 회원 로그인 */
  const handleLogin = async (e) => {
    e.preventDefault();
    signInUser(email, pw);
  };

  const handleLoginPage = () => {
    setHaveAccount((prev) => !prev);
    setEmail("");
    setPw("");
  };

  return (
    <>
      <form onSubmit={haveAccount ? handleLogin : handleSubmit}>
        <input
          onChange={handleValidEmail}
          value={email}
          placeholder="email"
          type="email"
        />
        {!validEmail && <p>올바른 이메일을 입력해주세요.</p>}
        <input
          onChange={handleValidPw}
          value={pw}
          placeholder="password"
          type="password"
        />
        {!validPw && <p>영문, 숫자 조합 8자리 이상 입력해주세요.</p>}
        <input type="submit" value={haveAccount ? "로그인" : "계정 생성"} />
      </form>
      <p onClick={handleLoginPage}>
        {haveAccount ? "새로운 계정 만들기" : "로그인하러 가기"}
      </p>
    </>
  );
};

export default LoginForm;
