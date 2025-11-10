import React from "react";

interface roleProps {
  role: string;
}

const RoleCard: React.FC<roleProps> = ({ role }) => {
  return (
    <div className="flex h-7.75 text-center bg-[#FFFDFB] rounded-lg">
      <p className="text-[#3A290D] text-[1rem] font-gabia ">{role}</p>
    </div>
  );
};

export default RoleCard;
