import InputField from "../../components/SelectRole/InputField";
import RoleCard from "../../components/SelectRole/RoleCard";
import StartBtn from "../../components/SelectRole/StartBtn";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const API = "https://junhong.shop";

type LocationState = {
  loginId: string;
  password: string;
  name: string;
  birth: string;
  familyCode: string;
};

const SelectRole: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [role, setRole] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const handleSignUp = async () => {
    await axios.post(`${API}/accounts/signup`, {
      loginId: state.loginId,
      password: state.password,
      name: state.name,
      birth: state.birth,
      familyCode: state.familyCode,
      role,
      nickname,
    });
    console.log("회원가입 완료!");
    navigate("/login");
  };

  return (
    <div className="w-[390px] h-screen flex flex-col gap-10 justify-center items-center bg-linear-to-b from-[#ECD6C7] to-white">
      <div className="flex text-left w-78 flex-col gap-3">
        <p className="text-[#3A290D] text-[0.875rem] font-gabia">
          당신은 가족 안에서 어떤 역할을 하고 있나요?
        </p>
        <div className="flex flex-row gap-3">
          <RoleCard
            role="엄마"
            selected={role === "엄마"}
            onClick={() => setRole("엄마")}
          />
          <RoleCard
            role="아빠"
            selected={role === "아빠"}
            onClick={() => setRole("아빠")}
          />
          <RoleCard
            role="아들"
            selected={role === "아들"}
            onClick={() => setRole("아들")}
          />
          <RoleCard
            role="딸"
            selected={role === "딸"}
            onClick={() => setRole("딸")}
          />
        </div>
        <div className="flex flex-row gap-3">
          <RoleCard
            role="할머니"
            selected={role === "할머니"}
            onClick={() => setRole("할머니")}
          />
          <RoleCard
            role="할아버지"
            selected={role === "할아버지"}
            onClick={() => setRole("할아버지")}
          />
          <RoleCard
            role="기타"
            selected={role === "기타"}
            onClick={() => setRole("기타")}
          />
        </div>
      </div>
      <div className="flex text-left mt-10">
        <InputField
          label="가족이 당신을 어떻게 부르길 원하시나요?"
          placeholder="호칭 입력"
          bgColor="bg-[#FFFDFB]"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div className="flex text-left mt-10">
        <InputField
          label="서로의 하루가 이어질 준비가 되었어요."
          placeholder="가족 초대 코드"
          bgColor="bg-[#EBD5C3]"
          value={state.familyCode}
          onChange={() => {}}
        />
      </div>
      <div className="mt-20 mb-20">
        <StartBtn onClick={handleSignUp} />
      </div>
    </div>
  );
};

export default SelectRole;
