import theme from 'globalTheme';
import styled from 'styled-components';
import { ButtonVariantType, ButtonPropsType } from './types';

const colorVariants = (key: ButtonVariantType) => {
  switch (key) {
    case 'secondary':
      return theme.color.secondary;

    case 'gray':
      return theme.color.gray;

    default:
      return theme.color.primary;
  }
};

const Button = styled.button<ButtonPropsType>`
  outline: none;
  border: none;
  border-radius: 4px;
  min-height: 32px;
  padding: 0.6rem 1.4rem;
  background: ${({ variant = 'primary' }) => colorVariants(variant)};
  color: white;
  font-size: ${theme.fontSize.default};
  &:hover {
    opacity: 0.85;
    cursor: pointer;
  }
`;

export default Button;
