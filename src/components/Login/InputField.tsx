import React from "react";

interface FeildNameProps {
  feildName: string;
}

const InputField: React.FC<FeildNameProps> = ({ feildName }) => {
  return (
    <>
      <input placeholder={feildName}></input>
    </>
  );
};

export default InputField;
