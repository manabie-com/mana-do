import React from 'react';

const CheckBox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="checkbox" {...props} />
}

export default CheckBox;