import React from 'react';

export interface Props {
  value?: boolean;
  onChange?: (val: boolean) => void;
}

export const Switch: React.FC<Props> = ({ value, onChange }) => {
  const [checked, setChecked] = React.useState(value);

  React.useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <label className='switch'>
      <input type='checkbox' checked={checked} onChange={handleChange} />
      <span className='slider round'></span>
    </label>
  );
};
