import React from "react";

const FamilyCode: React.FC = () => {
  return (
    <div className="w-[390px] h-screen flex flex-col items-center bg-[#D7BCA8]">
      <div className="flex flex-col w-81 h-47.25 rounded-[1.46875rem] bg-[#F8ECE3]">
        <p className="text-[#846F5E] text-[1.875rem] font-roundfix">
          Family code
        </p>
        <div className="w-69.5 h-11.5 rounded-xl bg-white]">
          <p className="text-[#3A290D] font-sans text-[0.875rem] font-semibold">
            F3RT0Y
          </p>
        </div>
        <p className="text-[#846F5E] font-sans text-[0.625rem]">
          가족과 연결하려면 코드가 필요해요! 가족에게 코드를 공유해주세요.
        </p>
      </div>
    </div>
  );
};

export default FamilyCode;
