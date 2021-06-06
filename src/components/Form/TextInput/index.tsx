import React from 'react';
import clsx from 'clsx';
import styled, { css } from 'styled-components';
import theme from 'globalTheme';
import { InputType } from './types';

const StyledFormControl = styled.div<InputType>`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

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
  width: ${(props) => (props.text ? '66%' : '100%')};
  &:focus {
    border-bottom: 1px solid ${theme.color.primary};
  }
`;

const TextInput = ({
  text = '',
  id = '',
  error = false,
  fullWidth = false,
  inputRef,
  className,
  ...rest
}: InputType) => {
  const classes = clsx('form__input-text', className);
  return (
    <StyledFormControl fullWidth={fullWidth}>
      {text && <StyledLabel htmlFor={id}>{text}</StyledLabel>}
      <StyledInput
        {...rest}
        ref={inputRef}
        id={id}
        text={text}
        className={classes}
        error={error}
        fullWidth={fullWidth}
      />
    </StyledFormControl>
  );
};

export default React.memo(TextInput);
