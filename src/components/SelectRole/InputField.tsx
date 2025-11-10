import React from "react";

interface labelProps {
  label: string;
  placeholder: string;
}

const InputField: React.FC<labelProps> = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[#3A290D] text-[0.875rem] font-gabia">{label}</p>
      <input
        className="w-78 h-10.75 rounded-[0.9375rem] text-[#846F5E] text-[0.75rem] font-gabia pl-4 "
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default InputField;
