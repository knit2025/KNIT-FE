import React from "react";

interface labelProps {
  label: string;
  placeholder: string;
}

const InputField: React.FC<labelProps> = ({ label, placeholder }) => {
  return (
    <div>
      <p>{label}</p>
      <input placeholder={placeholder}></input>
    </div>
  );
};

export default InputField;
