import { createUser, signInUser } from "../fireUtil";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  emailAtom,
  emailValidationAtom,
  pwAtom,
  pwValidationAtom,
} from "./recoil/Atoms";

const LoginForm = ({ haveAccount, setLoading }) => {
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
    setLoading(true);
    try {
      if (!isValidEmail || !isValidPw) {
        window.alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        await createUser(email, pw);
        setEmail("");
        setPw("");
      }
    } catch (error) {
      console.error("회원 `가입 에러", error);
    } finally {
      setLoading(false);
    }
  };

  /* 회원 로그인 */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(email, pw);
      setEmail("");
      setPw("");
    } catch (error) {
      console.error("로그인 에러", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-8 w-full text-3xl"
      onSubmit={haveAccount ? handleLogin : handleSubmit}
    >
      {/* 이메일 */}
      <div className="flex flex-col gap-2">
        <input
          className="w-full border border-black rounded-md p-5"
          name="email"
          onChange={handleEmailInput}
          value={email}
          placeholder="이메일을 입력해주세요"
          type="email"
        />
        {!isValidEmail && email.length > 1 && (
          <span className="text-2xl text-rose-500">
            올바른 이메일을 입력해주세요.
          </span>
        )}
      </div>

      {/* 패스워드 */}
      <div className="flex flex-col gap-2">
        <input
          className="w-full border border-black p-5"
          name="password"
          onChange={handlePwInput}
          value={pw}
          placeholder="비밀번호"
          type="password"
        />
        {!isValidPw && pw.length > 1 && (
          <span className="text-2xl text-rose-500">
            영문, 숫자 조합 8자리 이상 입력해주세요.
          </span>
        )}
      </div>

      {/* 제출 버튼 */}
      <input
        className={`cursor-pointer rounded-lg shadow-md font-bold text-white py-5 ${
          haveAccount ? "bg-blue-500" : "bg-green-500"
        }`}
        type="submit"
        value={haveAccount ? "로그인" : "계정 생성"}
      />
    </form>
  );
};
export default LoginForm;
