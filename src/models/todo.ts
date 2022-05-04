export enum Themes {
  Light = "light",
  Dark = "dark",
}

export enum TodoStatus {
  All = "all",
  Active = "active",
  Completed = "completed",
}

export enum TodoLoadingStatus {
  Idle = "idle",
  Loading = "loading",
}

export interface Todo {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
}
