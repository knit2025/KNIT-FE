import SignupInput from "../../components/SignUp/SignupInput";
import SignupBtn from "../../components/SignUp/SignupBtn";
import { useState } from "react";
import axios from "axios";

const API = "https://junhong.shop";

const SignUp: React.FC = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [familyCode, setFamilyCode] = useState<string | null>(null);
  const [idMessage, setIdMessage] = useState<string | null>(null);

  const handleCheckId = async () => {
    try {
      const res = await axios.get(`${API}/accounts/checkId`, {
        params: { loginId },
      });
      if (res.data.message === "ok ") {
        setIdMessage("사용 가능한 아이디입니다.");
      } else if (res.data.message === "id is taken") {
        setIdMessage("이미 사용 중인 아이디입니다.");
      }
    } catch {
      setIdMessage("오류 발생");
    }
  };

  const handleCreateFamilyCode = async () => {
    const res = await axios.post(`${API}/accounts/code`);
    console.log("가족코드:", res.data);
    setFamilyCode(res.data.familyCode);
  };

  const handleSignUp = async () => {
    await axios.post(`${API}/accounts/signup`, {
      loginId,
      password,
      name,
      birth,
      familyCode,
    });
    console.log("회원가입 완료!");
  };

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
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            ></input>
            <button
              onClick={handleCheckId}
              className="w-15.25 h-6 rounded-lg bg-[#523E1B] text-white font-sans text-[0.6875rem] cursor-pointer"
            >
              중복 확인
            </button>
          </div>
          {idMessage && (
            <div className="mt-2 text-[0.75rem] text-[#FF0000]">
              {idMessage}
            </div>
          )}
        </div>
        <SignupInput
          fieldName="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignupInput
          fieldName="비밀번호 확인"
          type="password"
          placeholder="비밀번호 입력"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <SignupInput
          fieldName="이름"
          type="text"
          placeholder="이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SignupInput
          fieldName="생년월일"
          type="text"
          placeholder="8자리 입력"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <div className="flex gap-23">
          <p className="text-[#3A290D] font-sans text-[0.75rem] font-semibold">
            *내가 우리 가족의 첫 가입자에요
          </p>
          <button
            onClick={handleCreateFamilyCode}
            className="w-20 h-6 rounded-lg bg-[#523E1B] text-white font-sans text-[0.6875rem] cursor-pointer"
          >
            가족 코드 생성
          </button>
        </div>
        <SignupBtn buttonName="회원가입" onClick={handleSignUp} />
      </div>
    </div>
  );
};

export default SignUp;
