import { createUser, signInUser } from "../fireUtil";
import styles from "./LoginForm.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  emailAtom,
  emailValidationAtom,
  pwAtom,
  pwValidationAtom,
} from "./recoil/Atoms";

const LoginForm = ({ haveAccount }) => {
  const [email, setEmail] = useRecoilState(emailAtom);
  const isValidEmail = useRecoilValue(emailValidationAtom);
  const [pw, setPw] = useRecoilState(pwAtom);
  const isValidPw = useRecoilValue(pwValidationAtom);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePwInput = (e) => {
    setPw(e.target.value);
  };

  /* 회원 생성 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail || !isValidPw) {
      window.alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    } else {
      await createUser(email, pw);
      setEmail("");
      setPw("");
    }
  };

  /* 회원 로그인 */
  const handleLogin = async (e) => {
    e.preventDefault();
    await signInUser(email, pw);
    setEmail("");
    setPw("");
  };

  return (
    <div className={styles.wrap}>
      {/* 로그인 폼 */}
      <form onSubmit={haveAccount ? handleLogin : handleSubmit}>
        {/* 이메일 */}
        <input
          className={styles.infoInput}
          name="email"
          onChange={handleEmailInput}
          value={email}
          placeholder="이메일"
          type="email"
        />
        {!isValidEmail && email.length > 1 && (
          <span className={styles.alert}>올바른 이메일을 입력해주세요.</span>
        )}

        {/* 패스워드 */}
        <input
          className={styles.infoInput}
          name="password"
          onChange={handlePwInput}
          value={pw}
          placeholder="비밀번호"
          type="password"
        />
        {!isValidPw && pw.length > 1 && (
          <span className={styles.alert}>
            영문, 숫자 조합 8자리 이상 입력해주세요.
          </span>
        )}

        {/* 제출 버튼 */}
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
