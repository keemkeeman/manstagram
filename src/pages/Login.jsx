import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
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
    <div className="flex flex-col lg:w-[1050px] w-[80%]">
      <div className="flex flex-col gap-12 items-center h-full py-48 px-10">
        <div className="flex flex-col gap-5 font-bold text-6xl w-full text-left">
          <p>안녕하세요!</p>
          <p>만스타그램입니다.</p>
        </div>
        <LoginForm haveAccount={haveAccount} />
        <div className="flex w-full justify-center items-center">
          <hr className="my-5 w-full border-2" />
          <span className="absolute bg-white px-3 text-neutral-400 text-3xl">
            또는
          </span>
        </div>
        <div className="text-5xl cursor-pointer">
          <i onClick={googleLogin} className="fa-brands fa-google"></i>
        </div>
        {haveAccount ? (
          <div className="flex justify-center gap-3 text-3xl py-10">
            <p>계정이 없으신가요?</p>
            <p
              onClick={handleLoginPage}
              className="font-bold cursor-pointer text-green-500"
            >
              가입하기
            </p>
          </div>
        ) : (
          <div className="flex justify-center text-3xl gap-3 py-10">
            <p>이미 계정이 있으신가요?</p>
            <p
              onClick={handleLoginPage}
              className="font-bold cursor-pointer text-blue-500"
            >
              로그인하기
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
