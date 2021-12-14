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

//I just need id and content passed to Edit Todo
export type TodoEdited  = Pick<Todo, "id" | "content">;