import React from 'react';

interface Props {
  value?: boolean;
  onChange?: (val: boolean) => void;
}

export const Switch: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label className='switch'>
      <input type='checkbox' checked={value} onChange={handleChange} />
      <span className='slider round'></span>
    </label>
  );
};
