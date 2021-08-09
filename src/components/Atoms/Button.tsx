import React from 'react';

const Button = ({text, ...props}: any) => {
  return <button {...props}>{text}</button>
}

export default Button
