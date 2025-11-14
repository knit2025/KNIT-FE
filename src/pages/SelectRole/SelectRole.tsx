import InputField from "../../components/SelectRole/InputField";
import RoleCard from "../../components/SelectRole/RoleCard";
import StartBtn from "../../components/SelectRole/StartBtn";

const SelectRole: React.FC = () => {
  return (
    <div className="w-[390px] h-screen flex flex-col gap-10 justify-center items-center bg-linear-to-b from-[#ECD6C7] to-white">
      <div className="flex text-left w-78 flex-col gap-3">
        <p className="text-[#3A290D] text-[0.875rem] font-gabia">
          당신은 가족 안에서 어떤 역할을 하고 있나요?
        </p>
        <div className="flex flex-row gap-3">
          <RoleCard role="엄마" />
          <RoleCard role="아빠" />
          <RoleCard role="아들" />
          <RoleCard role="딸" />
        </div>
        <div className="flex flex-row gap-3">
          <RoleCard role="할머니" />
          <RoleCard role="할아버지" />
          <RoleCard role="기타" />
        </div>
      </div>
      <div className="flex text-left mt-10">
        <InputField
          label="가족이 당신을 어떻게 부르길 원하시나요?"
          placeholder="호칭 입력"
          bgColor="bg-[#FFFDFB]"
        />
      </div>
      <div className="flex text-left mt-10">
        <InputField
          label="서로의 하루가 이어질 준비가 되었어요."
          placeholder="가족 초대 코드"
          bgColor="bg-[#EBD5C3]"
        />
      </div>
      <div className="mt-20 mb-20">
        <StartBtn />
      </div>
    </div>
  );
};

export default SelectRole;
