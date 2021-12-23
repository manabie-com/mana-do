import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ActionButton: React.FC<Props> = (props: Props) => {
  return <button {...props} className={`${props.className} Action__btn`} />;
};

export default ActionButton;
