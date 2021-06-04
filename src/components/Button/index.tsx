import theme from 'globalTheme';
import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 4px;
  min-height: 32px;
  padding: 0.6rem 1.4rem;
  background: ${theme.color.primary};
  color: white;
  font-size: ${theme.fontSize.default};
  &:hover {
    opacity: 0.85;
    cursor: pointer;
  }
`;

export default Button;
