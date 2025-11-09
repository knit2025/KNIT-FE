import OptionGroup from './OptionGroup';

type YesNoGroupProps = {
  value?: boolean;
  onChange: (v: boolean) => void;
};

const yesNoOptions = [
  { label: '네', value: true },
  { label: '아니오', value: false },
] as const;

export default function YesNoGroup({ value, onChange }: YesNoGroupProps) {
  return <OptionGroup options={yesNoOptions} value={value} onChange={onChange} />;
}

