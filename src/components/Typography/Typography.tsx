import React from 'react';
import styled from 'styled-components';
import theme from 'globalTheme';
import { StyledTypoType, TypographyType, VarientType } from './types';

const colorVariants = (key: VarientType) => {
  switch (key) {
    case 'error':
      return theme.color.error;

    case 'disable':
      return theme.color.gray;

    default:
      return theme.color.dark;
  }
};

const StyledTypo = styled.div<StyledTypoType>`
  color: ${(props) => colorVariants(props.variant)};
`;

const Typography: React.FC<TypographyType> = ({
  children,
  variant = 'default',
  ...rest
}) => {
  return (
    <StyledTypo variant={variant} {...rest}>
      {children}
    </StyledTypo>
  );
};

export default Typography;
