import { ToDoCreationProps } from './types';
import { Container } from './styles';
import { INPUT_PLACEHOLDER } from './constants';
import { StyledInput } from './styles';
import { FC, ReactElement } from 'react';

const ToDoCreation: FC<ToDoCreationProps> = ({ inputRef, onCreateTodo }): ReactElement => (
  <Container>
    <StyledInput
      ref={inputRef}
      placeholder={INPUT_PLACEHOLDER}
      onKeyDown={onCreateTodo}
    />
  </Container>
);

export default ToDoCreation;
