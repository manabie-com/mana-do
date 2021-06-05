import React, { ComponentPropsWithRef, FC } from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.input`
  width: 24px;
  height: 24px;
  box-shadow: none;
  border: none;
  outline: none;
`;

const Checkbox: FC<ComponentPropsWithRef<'input'>> = ({ ...rest }) => {
  return <StyledCheckbox {...rest} type="checkbox" />;
};

export default Checkbox;
