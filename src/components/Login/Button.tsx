import React from "react";

interface ButtonProps {
  buttonName: string;
}

const Button: React.FC<ButtonProps> = ({ buttonName }) => {
  return (
    <>
      <div>{buttonName}</div>
    </>
  );
};

export default Button;
