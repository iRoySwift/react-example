import React from 'react';

interface Props {
  label?: string;
  value?: string;
  options?: string[];
  onChange?: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select: React.FC<Props> = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label && <span>{label}：</span>}
      <select name="select" value={value} onChange={onChange}>
        {options?.map((item, key) => {
          // let optionProps = {};
          // if (value === item) {
          //   optionProps.value = item;
          // }
          return (
            <option key={key} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </label>
  );
};
export default Select;
