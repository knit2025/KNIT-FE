interface labelProps {
  label: string;
  placeholder: string;
  bgColor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const InputField: React.FC<labelProps> = ({
  label,
  placeholder,
  bgColor,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[#3A290D] text-[0.875rem] font-gabia">{label}</p>
      <input
        className={`w-78 h-10.75 rounded-[0.9375rem] focus:outline-none focus:ring-0 placeholder:text-[#846F5E] text-[#846F5E] text-[0.75rem] font-gabia pl-4  ${
          bgColor ?? "bg-white"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default InputField;
