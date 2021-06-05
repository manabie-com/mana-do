import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import styled from 'styled-components';
import theme from 'globalTheme';

const StyledCheckbox = styled.input`
  outline: none;
  border: none;
`;

const Checkbox = () => {
  return <StyledCheckbox />;
};

export default Checkbox;
