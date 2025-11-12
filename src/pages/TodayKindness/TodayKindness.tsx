import React from "react";
import Footer from "../../components/Footer/Footer";

const TodayKindness: React.FC = () => {
  return (
    <div className="w-[390px] h-screen flex flex-col items-center bg-white">
      <p className="font-gabia text-[#3A290D] text-[1.5rem] pt-20 pb-10">
        {" "}
        " 오늘 내가 가족에게 <br /> 베푼 작은 친절은? "{" "}
      </p>
      <Footer />
    </div>
  );
};

export default TodayKindness;
