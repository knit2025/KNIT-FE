import React from "react";
import InputField from "../../components/SelectRole/InputField";
import RoleCard from "../../components/SelectRole/RoleCard";
import StartBtn from "../../components/SelectRole/StartBtn";

const SelectRole: React.FC = () => {
  return;
  <div className="w-[390px] h-screen flex flex-col items-center bg-linear-to-b from-[#ECD6C7] to-white">
    <div>
      <p className="text-[#3A290D] text-[0.875rem] font-gabia">
        당신은 가족 안에서 어떤 역할을 하고 있나요?
      </p>
      <div>
        <RoleCard role="엄마" />
        <RoleCard role="아빠" />
        <RoleCard role="아들" />
        <RoleCard role="딸" />
      </div>
      <div>
        <RoleCard role="할머니" />
        <RoleCard role="할아버지" />
        <RoleCard role="기타" />
      </div>
    </div>
    <InputField />
    <InputField />
    <StartBtn />
  </div>;
};

export default SelectRole;
