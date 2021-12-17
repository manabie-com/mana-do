export enum TodoStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export interface Todo {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
}

export interface TodoEditInterface {
  todo: Todo;
  // setEdit: (type: boolean) => void;
}

export interface TodoListInterface {
  todos: Todo[];
  showing: TodoStatus | "ALL";
}

export interface TodoToolBarInterface {
  todos: Todo[];
  setShowing: (type: TodoStatus | "ALL") => void;
}
