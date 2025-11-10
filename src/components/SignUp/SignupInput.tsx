import React from "react";

interface FieldProps {
  fieldName: string;
  type: string;
  placeholder: string;
}

const SignupInput: React.FC<FieldProps> = ({
  fieldName,
  type,
  placeholder,
}) => {
  return (
    <div>
      <label className="font-sans text-[#3A290D] font-semibold">
        {fieldName}
      </label>
      <input
        className="w-[20.18763rem] h-px border-[red]"
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default SignupInput;
