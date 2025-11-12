import React from "react";
import { useState } from "react";

type BoxProps = {
  family: string;
  content: string;
  onSave: (family: string, text: string) => void;
};

const KindnessBox: React.FC<BoxProps> = ({ family, content, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(content);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave(family, text);
      setEditing(false);
    }
  };
  return (
    <div className="flex w-85.5 h-30.5 rounded-[1.5625rem] bg-[#FEF1E8] flex-col text-left p-6 mb-5 gap-2">
      <p
        className="text-[#3A290D] font-sans text-[0.8125rem] font-bold"
        onClick={() => setEditing(true)}
      >
        {family}
      </p>
      {editing ? (
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="오늘의 친절"
          className="outline-none text-[0.75rem]"
        />
      ) : content ? (
        <p className="text-[#000000] font-sans text-[0.6875rem]">{content}</p>
      ) : (
        <p className="text-[#CBCBCB] font-sans text-[0.6875rem]">
          오늘의 친절을 입력해 주세요.
        </p>
      )}
    </div>
  );
};

export default KindnessBox;
