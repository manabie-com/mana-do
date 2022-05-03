import { KeyboardEvent } from 'react';
import { ChangeEvent } from 'react';
import { Todo } from '../../types/types';

export interface ToDoListProps {
  todos: Todo[];
  showEditField: boolean;
  selectedTodoId: string;
  onUpdateTodoStatus: (e: ChangeEvent<HTMLInputElement>, todoId: string) => void;
  onDeleteToDo: (toDoId: string) => void;
  onEditTodo: (e: KeyboardEvent<HTMLInputElement>, todoId: string, todoContent: string) => void;
  onHandleShowInlineEdit: (hasInlineEdit: boolean, todoId: string) => void;
}
