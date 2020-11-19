export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface Todo {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
}

export enum TODO_KEYS {
  todos = 'todoList',
}

export interface ITodo {
  className?: string;
  editTodoIndex: number;
  isShowEditInput: boolean;
  inputEditedTodoRef: React.RefObject<HTMLInputElement>;
  handleDeleteTodo: (id: string) => void;
  onClickEditTodo: (todo: Todo, index: number) => void;
  onMouseOutFocusEdit: (event: React.FocusEvent<HTMLInputElement>) => void;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void;
  onKeyDownEdit: (
    todoId: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
}
export interface ITodoList extends ITodo {
  todosList: Todo[];
}
export interface ITodoItem extends ITodo {
  todo: Todo;
  index: number;
}
