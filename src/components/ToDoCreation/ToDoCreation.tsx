import { ToDoCreationProps } from './types';
import { Container } from './styles';
import { INPUT_PLACEHOLDER } from './constants';
import { StyledInput } from './styles';
import { FC } from 'react';

const ToDoCreation: FC<ToDoCreationProps> = ({ onCreateTodo }) => (
  <Container>
    <StyledInput
      data-testid="create-input-field"
      placeholder={INPUT_PLACEHOLDER}
      onKeyDown={onCreateTodo}
    />
  </Container>
);

export default ToDoCreation;
