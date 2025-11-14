import "../../styles/Global.css";

interface ButtonProps {
  buttonName: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonName, onClick }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-81 h-11.75 rounded-[1.4375rem] bg-[#F7F7F7] text-[#3A290D] font-suit font-weight-500 font-size-1.125rem cursor-pointer hover:bg-[#3A290D] hover:text-[#FFF] transition-colors duration-300"
        onClick={onClick}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
