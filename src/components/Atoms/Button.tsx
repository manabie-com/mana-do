import React from 'react';

const Button = ({text, showIcon = true, ...props}: any) => {
  return <button {...props}>
    {showIcon && <span>✓</span>} {text}
  </button>
}

export default Button
