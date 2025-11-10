import React from "react";
import SignupInput from "../../components/SignUp/SignupInput";
import Button from "../../components/Login/Button";

const SignUp: React.FC = () => {
  return (
    <div>
      <div>
        <div>
          <SignupInput
            fieldName="아이디"
            type="email"
            placeholder="아이디 입력"
          />
          <button>중복 확인</button>
        </div>
        <SignupInput
          fieldName="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
        />
        <SignupInput
          fieldName="비밀번호 확인"
          type="password"
          placeholder="비밀번호 입력"
        />
        <SignupInput fieldName="이름" type="text" placeholder="이름 입력" />
        <SignupInput
          fieldName="생년월일"
          type="text"
          placeholder="8자리 입력"
        />
        <div>
          <p>*내가 우리 가족의 첫 가입자에요</p>
          <button>가족 코드 생성</button>
        </div>
        <Button buttonName="회원가입" />
      </div>
    </div>
  );
};

export default SignUp;
