import React from 'react';

const Label = ({children, text, ...props}: any) => {
  return (
    <label {...props}>
      {text}
      {children}
    </label>
  );
}
;

export default Label;
