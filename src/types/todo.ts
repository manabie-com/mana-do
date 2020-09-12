export enum ETodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface ITodo {
  id: string
  user_id: string
  content : string
  status?: ETodoStatus
  created_date: string
}