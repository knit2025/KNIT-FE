import React from "react";
import SignupInput from "../../components/SignUp/SignupInput";
import SignupBtn from "../../components/SignUp/SignupBtn";

const SignUp: React.FC = () => {
  return (
    <div className="w-[390px] h-screen flex flex-col items-center bg-white">
      <h1 className="text-[#3A290D] font-sans text-[1.5rem] font-semibold pt-20 pb-10">
        회원가입
      </h1>
      <div className="flex flex-col gap-4 mt-6 m-5">
        <div className="flex flex-col text-left">
          <label className="font-sans text-[#3A290D] font-semibold text-[0.875rem] pb-4">
            아이디
          </label>
          <div className="flex gap-2">
            <input
              className="w-[16.1875rem] h-5 bg-white focus:outline-none focus:ring-0 placeholder:text-[#CBCBCB] placeholder: text-[0.75rem] text-[#786B56] border-b border-[#DDD] pb-2"
              type="text"
              placeholder="아이디 입력"
            ></input>
            <button className="w-15.25 h-6 rounded-lg bg-[#523E1B] text-white font-sans text-[0.6875rem] cursor-pointer">
              중복 확인
            </button>
          </div>
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
        <div className="flex gap-23">
          <p className="text-[#3A290D] font-sans text-[0.75rem] font-semibold">
            *내가 우리 가족의 첫 가입자에요
          </p>
          <button className="w-20 h-6 rounded-lg bg-[#523E1B] text-white font-sans text-[0.6875rem] cursor-pointer">
            가족 코드 생성
          </button>
        </div>
        <SignupBtn buttonName="회원가입" />
      </div>
    </div>
  );
};

export default SignUp;
