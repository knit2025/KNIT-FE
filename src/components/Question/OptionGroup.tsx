import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

// Simpler, non-generic option item
export type OptionItem = {
  label: string;
  value: string | number | boolean;
};

type SelectableButtonProps = PropsWithChildren<
  { selected?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>
>;

function SelectableButton({ selected = false, className = '', children, ...rest }: SelectableButtonProps) {
  return (
    <button
      {...rest}
      className={`
        min-w-[59px] h-[24px] px-3 rounded-md text-[10px] font-semibold transition-all
        ${selected ? 'bg-[#523E1B] text-white' : 'bg-[#FFFCF9] text-[#3A290D]'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

type OptionGroupProps = {
  options: ReadonlyArray<OptionItem>;
  value?: OptionItem['value'];
  onChange: (v: OptionItem['value']) => void;
  className?: string;
};

function OptionGroup({ options, value, onChange, className = '' }: OptionGroupProps) {
  return (
    <div className={`flex items-center justify-start gap-[18px] ${className}`}>
      {options.map((option) => (
        <SelectableButton
          key={String(option.value ?? option.label)}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </SelectableButton>
      ))}
    </div>
  );
}

export default OptionGroup;

// Yes/No group for boolean choices
type YesNoGroupProps = {
  value?: boolean;
  onChange: (v: boolean) => void;
};

export function YesNoGroup({ value, onChange }: YesNoGroupProps) {
  const yesNoOptions: OptionItem[] = [
    { label: '네', value: true },
    { label: '아니오', value: false },
  ];
  return <OptionGroup options={yesNoOptions} value={value} onChange={onChange} />;
}
