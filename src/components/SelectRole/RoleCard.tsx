interface roleProps {
  role: string;
  selected?: boolean;
  onClick?: () => void;
}

const RoleCard: React.FC<roleProps> = ({ role, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex h-7.75 items-center justify-center rounded-lg min-w-14 cursor-pointer ${
        selected ? "bg-[#523E1B]" : "bg-[#ffffff]"
      }`}
    >
      <p
        className={`text-[1rem] font-gabia pl-1 pr-1 ${
          selected ? "text-[#ffffff]" : "text-[#3A290D]"
        }`}
      >
        {role}
      </p>
    </div>
  );
};

export default RoleCard;
