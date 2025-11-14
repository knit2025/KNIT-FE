import "../../styles/Global.css";

interface ButtonProps {
  buttonName: string;
  onClick?: () => void;
}

const SignupBtn: React.FC<ButtonProps> = ({ buttonName, onClick }) => {
  return (
    <div className="pt-20 pb-20">
      <button
        type="submit"
        className="w-81 h-11.75 rounded-[1.4375rem] bg-[#A9927F] text-[#F3F0ED] font-suit font-weight-500 font-size-1.125rem cursor-pointer"
        onClick={onClick}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default SignupBtn;
