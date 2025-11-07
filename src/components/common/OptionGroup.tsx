import { memo } from 'react';
import SelectableButton from './SelectableButton';

export type OptionItem<T> = { label: string; value: T };

type OptionGroupProps<T> = {
  options: ReadonlyArray<OptionItem<T>>;
  value?: T;
  onChange: (v: T) => void;
  className?: string;
};

function OptionGroupInner<T>({ options, value, onChange, className = '' }: OptionGroupProps<T>) {
  return (
    <div className={`flex items-center justify-start gap-3 ${className}`}>
      {options.map((option) => (
        <SelectableButton
          key={(option.value as unknown as string) ?? option.label}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </SelectableButton>
      ))}
    </div>
  );
}

const OptionGroup = memo(OptionGroupInner) as typeof OptionGroupInner;
export default OptionGroup;
