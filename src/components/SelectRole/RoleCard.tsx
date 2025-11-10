import React from "react";

interface roleProps {
  role: string;
}

const RoleCard: React.FC<roleProps> = ({ role }) => {
  return (
    <div>
      <p>{role}</p>
    </div>
  );
};

export default RoleCard;
