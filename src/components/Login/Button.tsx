import React from "react";
import "../../styles/Global.css";

interface ButtonProps {
  buttonName: string;
}

const Button: React.FC<ButtonProps> = ({ buttonName }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-81 h-11.75 rounded-[1.4375rem] bg-[#F7F7F7] text-[#3A290D] font-suit font-weight-500 font-size-1.125rem cursor-pointer"
      >
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
