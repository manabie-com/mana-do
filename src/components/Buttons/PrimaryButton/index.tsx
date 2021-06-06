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

const PrimaryButton = styled.button<ButtonPropsType>`
  outline: none;
  border: none;
  border-radius: 4px;
  min-height: 32px;
  padding: 0.6rem 1.4rem;

  background: ${({ active, variant = 'primary' }) =>
    active ? theme.color.error : colorVariants(variant)};
  width: ${({ width = 'auto' }) => width};
  color: white;
  margin: 0 0.4rem;

  &:hover {
    opacity: 0.85;
    cursor: pointer;
  }
`;

export default PrimaryButton;
