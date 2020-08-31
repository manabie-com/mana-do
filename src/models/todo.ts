export type TodoStatus = 'ACTIVE' | 'COMPLETED';

export interface Todo {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
}
