export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export type EnhanceTodoStatus = TodoStatus | "ALL"
export interface Todo {
  id: string
  user_id: string
  content : string
  status?: TodoStatus
  created_date: string
  updated_date: string
}
export interface FormOptions {
  id: string
  name: string
  type?: string
  label: string
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export interface Data {
  [key: string]: string | number | readonly string[] | undefined
}