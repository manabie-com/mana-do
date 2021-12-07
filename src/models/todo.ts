export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  id: string
  user_id: string
  content : string
  status?: TodoStatus
  created_date: string
}

export interface TodoFormInterface {
  onKeyDown: (todo: string) => void
}

export interface TodoEditFormInterface {
  todo: Todo,
  onUpdateTodo: (todo: Todo) => void,
  onCancelUpdate: () => void
}

export interface TodoListInterface {
  todos: Todo[],
  showing: TodoStatus | 'ALL',
  onDelete: (id: string) => void,
  onUpdateTodoContent: (id: string, todo: string) => void,
  onUpdateTodoStatus: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void,
}

export interface TodoToolbarInterface {
  todos: Todo[],
  showing: TodoStatus | 'ALL',
  onDeleteAllTodo: () => void
  setShowing: (type: TodoStatus | 'ALL') => void,
  onToggleAllTodo: (event: React.ChangeEvent<HTMLInputElement>) => void,
}