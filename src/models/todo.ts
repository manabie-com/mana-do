export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

/*
* Revised Todo to add the isBeingEdited property for tracking editing state
*/
export interface Todo {
  id: string
  user_id: string
  content : string
  status?: TodoStatus
  created_date: string
  isBeingEdited?: boolean
}