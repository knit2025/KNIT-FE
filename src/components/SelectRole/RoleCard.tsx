import React from "react";

interface roleProps {
  role: string;
}

const RoleCard: React.FC<roleProps> = ({ role }) => {
  return (
    <div className="flex h-7.75 items-center justify-center bg-[#FFFDFB] rounded-lg min-w-14 cursor-pointer">
      <p className="text-[#3A290D] text-[1rem] font-gabia pl-1 pr-1 ">{role}</p>
    </div>
  );
};

export default RoleCard;
