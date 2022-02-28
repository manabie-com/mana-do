export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

// Have to define an interface for object to know exactly what its properties
export interface Todo {
  content: string
  created_date: string
  status: TodoStatus
  id: string
  user_id: "firstUser"
}