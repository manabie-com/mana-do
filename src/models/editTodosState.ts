export interface EditTodoState {
  content: string;
}

export interface EditTodoStateStore {
  [key: string]: EditTodoState;
}
