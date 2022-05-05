export enum TodoStatus {
	ALL = "ALL",
	ACTIVE = "ACTIVE",
	COMPLETED = "COMPLETED",
}

export interface Todo {
	/// Add type to Todo
	content: string;
	created_date: string;
	status: string;
	id: string;
	user_id: string;
}
