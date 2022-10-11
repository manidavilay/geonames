import "./Select.scss";

type Props = {
  optionData: string[] | number[];
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const Select = ({ optionData, disabled, onChange }: Props) => {
  return (
    <select disabled={disabled} onChange={onChange} className="select">
        {!disabled && (
            <>
                {optionData.map((option, index) => (
                    <option key={index} value={option}>
                    {option}
                    </option>
                ))}
            </>
        )}
    </select>
  );
};

export default Select;
