import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import styled from 'styled-components';
import theme from 'globalTheme';

type InputType = ComponentPropsWithoutRef<'input'> & {
  error?: boolean;
};

type TextInputPropsType = InputType & {
  text: string;
};

const StyledLabel = styled.label`
  display: inline-block;
  width: 30%;
  text-align: right;
  padding-right: 3%;
`;

const StyledInput = styled.input<InputType>`
  outline: none;
  border: none;
  border-bottom: 1px solid
    ${(props) => (props.error ? theme.color.error : theme.color.gray)};
  background: none;
  color: ${(props) => (props.error ? theme.color.error : 'currentColor')};
  font-size: ${theme.fontSize.default};
  padding: 0;
  min-height: 36px;
  transition: border 0.2s ease-in-out;
  width: 66%;
  &:focus {
    border-bottom: 1px solid ${theme.color.primary};
  }
`;

const Input = forwardRef<HTMLInputElement, InputType>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

const TextInput = ({
  text,
  id = '',
  className,
  error = false,
  ...rest
}: TextInputPropsType) => {
  const classes = clsx('input__text', className);
  return (
    <div className="form-control">
      <StyledLabel htmlFor={id}>{text}</StyledLabel>
      <Input {...rest} id={id} className={classes} error={error} />
    </div>
  );
};

export default TextInput;
