import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";
import sheepImg from "../../assets/LoginSheep.png";
import knitLogo from "../../assets/login-knit-logo.png";
import "../../styles/Global.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      setErrorMessage(null);
      const response = await axios.post(`${baseURL}/accounts/login`, {
        loginId,
        password,
      });
      const { access, loginId: returnedId } = response.data;

      if (!access) {
        throw new Error("access 토큰이 없습니다.");
      }
      localStorage.setItem("accessToken", access);
      if (returnedId) {
        localStorage.setItem("loginId", returnedId);
      }

      setLoginId("");
      setPassword("");
      navigate("/home");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const detail = error.response?.data?.detail;
        if (status === 400) {
          const message = detail || "";
          setErrorMessage(message);
        } else {
          setErrorMessage("로그인에 실패했습니다.");
        }
      }
    }
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="relative mx-auto w-[390px] h-screen flex flex-col justify-center items-center bg-linear-to-b from-[#FFFFFF] to-[#DBBBA4]">
      <div className="flex flex-col items-center text-center mt-20 mb-10 space-y-1">
        <p className="text-[#3A290D] text-base font-sans font-bold">
          가족 사이의 마음과 마음을 잇는
        </p>
        <img src={knitLogo} alt="Sheep" className="w-25 h-6.25 mt-2 mb-10" />
        <img src={sheepImg} alt="Sheep" className="p-2" />
      </div>
      <div className="-mt-45">
        <div className="space-y-3 font-sans font-normal">
          <InputField
            type="text"
            fieldName="아이디 입력"
            value={loginId}
            onChange={handleId}
          ></InputField>
          <InputField
            type="password"
            fieldName="비밀번호 입력"
            value={password}
            onChange={handlePassword}
          ></InputField>
        </div>
        {errorMessage && (
          <p className="mt-3 text-xs text-red-500 font-sans">{errorMessage}</p>
        )}
        <div className=" flex flex-col gap-4 space-y-2 font-sans font-bold mt-4 mb-20 ">
          <Button buttonName="로그인" onClick={handleLogin}></Button>
          <Button buttonName="회원가입" onClick={goToSignUp}></Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
