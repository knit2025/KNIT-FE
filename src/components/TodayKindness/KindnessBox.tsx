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
    <div
      className="flex w-85.5 h-30.5 rounded-[1.5625rem] bg-[#FEF1E8] flex-col text-left p-6 mb-5 gap-2 cursor-pointer"
      onClick={() => setEditing(true)}
    >
      <p className="text-[#3A290D] font-sans text-[0.8125rem] font-bold">
        {family}
      </p>
      {editing ? (
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="서두르지 않아도 괜찮아요. 천천히, 오늘의 마음을 써볼까요?"
          className="outline-none placeholder: text-[#A0988A] placeholder: text-[0.6875rem] placeholder: font-sans"
        />
      ) : content ? (
        <p className="text-[#000000] font-sans text-[0.6875rem]">{content}</p>
      ) : (
        <p className="text-[#A0988A] font-sans text-[0.6875rem]">
          서두르지 않아도 괜찮아요. 천천히, 오늘의 마음을 써볼까요?
        </p>
      )}
    </div>
  );
};

export default KindnessBox;
