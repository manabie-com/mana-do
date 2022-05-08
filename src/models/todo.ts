export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

// Change interface Todo for more clarity
export interface Todo {
  id: string
  user_id: string
  content : string
  status?: TodoStatus
  created_date: string
}

export type EnhanceTodoStatus = TodoStatus | 'ALL';
