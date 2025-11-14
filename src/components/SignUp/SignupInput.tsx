interface FieldProps {
  fieldName: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignupInput: React.FC<FieldProps> = ({
  fieldName,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col text-left">
      <label className="font-sans text-[#3A290D] font-semibold text-[0.875rem] pb-5">
        {fieldName}
      </label>
      <input
        className="w-[20.18763rem] h-5 bg-white focus:outline-none focus:ring-0 placeholder:text-[#CBCBCB] placeholder: text-[0.75rem] text-[#786B56] border-b border-[#DDD] pb-2"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default SignupInput;
