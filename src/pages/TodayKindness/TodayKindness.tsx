import React from "react";
import Footer from "../../components/Footer/Footer";
import KindnessBox from "../../components/TodayKindness/KindnessBox";
import { useState } from "react";

const TodayKindness: React.FC = () => {
  const familyList = ["아빠", "엄마", "형", "동생", "할머니", "할아버지"];

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSave = (name: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [name]: text }));
  };

  return (
    <div className="w-[390px] h-screen flex flex-col items-center bg-white">
      <p className="font-gabia text-[#3A290D] text-[1.5rem] pt-20 pb-10">
        {" "}
        " 오늘 내가 가족에게 <br /> 베푼 작은 친절은? "{" "}
      </p>
      <div className="flex flex-col items-center w-full">
        {familyList.map((name) => (
          <KindnessBox
            key={name}
            family={name}
            content={answers[name] || ""}
            onSave={handleSave}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default TodayKindness;
