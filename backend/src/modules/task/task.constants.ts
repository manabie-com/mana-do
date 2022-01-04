export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  id?: string
  userId: string
  content : string
  status?: TaskStatus
  createdDate: string
}
