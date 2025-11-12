import React from "react";

type BoxProps = {
  family: string;
  content: string;
};

const KindnessBox: React.FC<BoxProps> = ({ family, content }) => {
  return (
    <div className="flex w-85.5 h-30.5 rounded-[1.5625rem]bg-[#FEF1E8] flex-col p-4 gap-2">
      <p className="text-[#3A290D] font-sans text-[0.8125rem]">{family}</p>
      <p className="text-[#000000] font-sans text-[0.6875rem]">{content}</p>
    </div>
  );
};

export default KindnessBox;
