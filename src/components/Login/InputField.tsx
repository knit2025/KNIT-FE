import React from "react";

interface FieldNameProps {
  fieldName: string;
  type: string;
}

const InputField: React.FC<FieldNameProps> = ({ fieldName, type }) => {
  return (
    <div>
      <input
        type={type}
        className="w-81 h-9.75 bg-[#F7F7F7] rounded-[0.9375rem] focus:outline-none focus:ring-0 placeholder:text-[#786B56] placeholder: text-[0.875rem] text-[#786B56] pl-6"
        placeholder={fieldName}
      ></input>
    </div>
  );
};

export default InputField;
