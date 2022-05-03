import { ChangeEvent } from 'react';
import { Todo, TodoStatus } from '../../types/types';
import { EnhanceTodoStatus } from '../types';

export interface ToDoToolbarProps {
  todos: Todo[],
  filter: EnhanceTodoStatus | 'ALL',
  onFilterStatus: (value: TodoStatus | 'ALL') => void,
  onToggleAllTodo: (e: ChangeEvent<HTMLInputElement>) => void,
  onDeleteAllTodo: () => void;
}
