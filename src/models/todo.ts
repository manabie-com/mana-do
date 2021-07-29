export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

//add enum to remove hard code string 'ALL'
export enum TodoStatusExtend {
  ALL = 'ALL'
}

export type EnhanceTodoStatus = TodoStatus | TodoStatusExtend;


export interface Todo {
  id: string
  user_id: string
  content : string
  status?: TodoStatus
  created_date: string
}