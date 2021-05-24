import React from 'react';
import Classes from './RemoveButton.module.scss';

export interface IRemoveButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.Component | string;
  disabled?: boolean;
}

const RemoveButton = (props: IRemoveButtonProps) => {
  const {
    className,
    disabled,
    onClick,
    children
  } = props;
  return (
    <button disabled={disabled} onClick={onClick} className={`${Classes.RemoveButton} ${className}`}>
      {children}
    </button>
  )
};

export default RemoveButton;