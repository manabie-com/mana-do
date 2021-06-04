import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import styled from 'styled-components';
import theme from 'globalTheme';

type TextInputPropsType = ComponentPropsWithoutRef<'input'> & {
  text: string;
};

const StyledInput = styled.input`
  border-radius: 5px;
  border: 1px solid ${theme.color.primary};
  font-size: ${theme.fontSize.default};
  padding: 0.5rem 1rem;
`;

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  (props, ref) => {
    return <StyledInput ref={ref} {...props} />;
  }
);

const TextInput = ({
  text,
  id = '',
  className,
  ...rest
}: TextInputPropsType) => {
  const classes = clsx('input__text', className);
  return (
    <div>
      {id && <label htmlFor={id}>{text}</label>}
      <Input {...rest} id={id} className={classes} />
    </div>
  );
};

export default TextInput;
