import { memo, type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

type SelectableButtonProps = PropsWithChildren<
  {
    selected?: boolean;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>;

function SelectableButtonBase({ selected = false, className = '', children, ...rest }: SelectableButtonProps) {
  return (
    <button
      {...rest}
      className={`
        w-30 px-2 py-3 rounded-xl text-[10px] font-semibold transition-all
        ${selected ? 'bg-white text-gray-800 shadow-md' : 'bg-[#FFFCF9]'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

const SelectableButton = memo(SelectableButtonBase);
export default SelectableButton;

