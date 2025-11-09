import React from "react";

interface FiledNameProps {
  feildName: string;
}

const InputField: React.FC<FiledNameProps> = ({ feildName }) => {
  return (
    <>
      <input placeholder={feildName}></input>
    </>
  );
};

export default InputField;
