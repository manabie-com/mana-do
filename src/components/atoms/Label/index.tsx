import React from 'react';
interface LabelProps {
  className?: string, 
  htmlFor?: string,
  role?: string
}

const Label: React.FC<LabelProps> = ({ children, className, htmlFor, role }) => (
   <label htmlFor={htmlFor} role={role}  className={className}> {children}</label>
);

Label.defaultProps = {
  className: '',
  htmlFor: '',
  role: ''
}

export default Label;
