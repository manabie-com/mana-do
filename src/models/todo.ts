export enum TodoStatus {
	ACTIVE = "ACTIVE",
	COMPLETED = "COMPLETED",
}

export interface Todo {
	id: string;
	content: string;
	created_date: string;
	status: TodoStatus;
	user_id: string;
}
