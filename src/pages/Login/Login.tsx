import React from "react";
import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";
import sheepImg from "../../assets/LoginSheep.png";
import knitLogo from "../../assets/login-knit-logo.png";
import "../../styles/Global.css";

const Login: React.FC = () => {
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
          <InputField type="text" fieldName="아이디 입력"></InputField>
          <InputField type="password" fieldName="비밀번호 입력"></InputField>
        </div>
        <div className=" flex flex-col gap-4 space-y-2 font-sans font-bold mt-4 mb-20 ">
          <Button buttonName="로그인"></Button>
          <Button buttonName="회원가입"></Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
