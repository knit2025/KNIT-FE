import React from "react";
import knitting1 from "../../assets/knitting1.png";

const Knitting: React.FC = () => {
  return (
    <div className="w-[390px] h-screen flex flex-col justify-center items-center bg-linear-to-b from-[#FFEADB] to-[#FFFFFF]">
      <p className="font-roundfix text-[#826F5F] text-[1.875rem] pb-10 ">
        {"< knitting >"}
      </p>
      <img src={knitting1} className="w-[22.49388rem] h-[31.37693rem]"></img>
    </div>
  );
};

export default Knitting;
