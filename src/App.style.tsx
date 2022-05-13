import styled from 'styled-components';

type InputProps = {
  type: string;
  onChange: () => void;
  onKeyDown: () => void;
};

export const Main = styled.main`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
`;

export const Div = styled.div``;

export const Input = styled.input.attrs<InputProps>({
  type: 'text',
})`
  min-height: 36px;
  border: none;
  outline: none;
  padding: 0 12px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  &:focus {
    box-shadow: 1px 0 9px rgba(0, 0, 0, 0.25);
  }
`;

export const TodoInput = styled(Input)`
  flex: 1 1;
`;

export const Checkbox = styled(Input).attrs({
  type: 'checkbox',
})`
  width: 24px;
  height: 24px;
  box-shadow: none;
  border: none;
  outline: none;

  &:focus {
    box-shadow: none;
    border: none;
    outline: none;
  }
`;

export const Button = styled.button.attrs({
  type: 'button',
})`
  outline: none;
  border: none;
  box-shadow: 2px 0 2px currentColor;
  border-radius: 4px;
  min-height: 32px;
  min-width: 80px;
  padding: 4px 8px;

  &:hover {
    opacity: 0.85;
  }
`;
