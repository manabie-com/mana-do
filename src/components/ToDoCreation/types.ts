import { KeyboardEvent } from 'react';

export interface ToDoCreationProps {
  onCreateTodo: (e: KeyboardEvent<HTMLInputElement>) => void;
}
