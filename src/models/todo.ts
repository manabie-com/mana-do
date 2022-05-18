export enum TodoStatus {
	ACTIVE = 'ACTIVE',
	COMPLETED = 'COMPLETED',
}

export interface Todo {
	id: string;
	content: string;
	created_date?: string;
	user_id?: string;
	status?: TodoStatus;
}

export enum FilterType {
	ACTIVE = 'ACTIVE',
	COMPLETED = 'COMPLETED',
	ALL = 'ALL',
}
