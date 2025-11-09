import React from "react";
import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";
// import sheepImg from "../../assets/LoginSheep.png";

const Login: React.FC = () => {
  return (
    <div>
      <div>
        <span>가족 사이의 마음과 마음을 잇는</span>
        <span>KNIT</span>
      </div>
      <InputField feildName="아이디 입력"></InputField>
      <InputField feildName="비밀번호 입력"></InputField>
      <Button buttonName="로그인"></Button>
      <Button buttonName="회원가입"></Button>
    </div>
  );
};

export default Login;
