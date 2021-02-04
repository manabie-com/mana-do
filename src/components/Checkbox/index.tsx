import React, { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ReactComponent as CheckIcon } from './check.svg';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { id, label } = props;
  return (
    <Wrapper>
      <InputCheckbox type="checkbox" ref={ref} {...props} />
      <CheckboxIcon />
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  min-width: 24px;
  min-height: 24px;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid #2185d0;
  }
`;

const CheckboxIcon = styled(CheckIcon)`
  width: 24px;
  color: #2185d0;
  position: absolute;
  z-index: -1;
`;

const InputCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 24px;
  height: 24px;
  margin: 0;

  & ~ ${CheckboxIcon} {
    display: none;
  }

  &:checked ~ ${CheckboxIcon} {
    display: block;
  }
`;

const Label = styled.label`
  padding-left: 36px;
  line-height: 24px;
`;
