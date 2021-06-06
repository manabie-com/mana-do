import theme from 'globalTheme';
import styled from 'styled-components';

const DeleteButton = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  outline: none;
  border: none;
  background: none;
  box-shadow: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.3;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 15px;
    height: 20px;
    width: 2px;
    background-color: ${theme.color.dark};
  }
  &:before {
    transform: translateY(-50%) rotate(45deg);
  }
  &:after {
    transform: translateY(-50%) rotate(-45deg);
  }
  &:hover {
    opacity: 1;
  }
`;

export default DeleteButton;
