export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  [key: string]: any,
}

export interface EditTodo {
  editMode: boolean,
  id: any,
  content: any
}