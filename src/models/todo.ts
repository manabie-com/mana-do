export enum TodoStatus {
  All = 'ALL',
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

export enum TodoLoadingStatus {
  Idle = 'idle',
  Loading = 'loading'
}

export interface Todo {
  id: string
  user_id: string
  content: string
  status?: TodoStatus
  created_date: string
}
