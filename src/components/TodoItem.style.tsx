import styled from 'styled-components';
import { Button } from '../App.style';

export const StyledTodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TodoContent = styled.span`
  flex: 1 1;
  text-align: left;
  margin-left: 8px;
  padding: 10px 0;
`;

export const DeleteButton = styled(Button)`
  width: 24px;
  height: 24px;
  outline: none;
  border: none;
  min-width: auto;
  min-height: auto;
  box-shadow: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
`;
