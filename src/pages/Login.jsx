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
    <div className="absolute m-[100px] p-[50px] rounded-lg bg-neutral-50 shadow-lg">
      <div className="flex flex-col items-center h-full">
        <h1 className="font-bold text-3xl m-10">Manstagram</h1>
        <LoginForm haveAccount={haveAccount} />
        <div className="flex justify-center items-center">
          <hr className="my-5 w-[250px]" />
          <span className="absolute bg-neutral-50 px-3 text-neutral-400 text-md">
            또는
          </span>
        </div>
        <div className="text-2xl cursor-pointer">
          <i onClick={googleLogin} className="fa-brands fa-google"></i>
        </div>
      </div>
      {haveAccount ? (
        <div className="flex justify-center mt-10 text-md gap-2">
          <p>계정이 없으신가요?</p>
          <p
            onClick={handleLoginPage}
            className="font-bold cursor-pointer text-green-500"
          >
            가입하기
          </p>
        </div>
      ) : (
        <div className="flex justify-center mt-10 text-md gap-2">
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
  );
};

export default Login;
