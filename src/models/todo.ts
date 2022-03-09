export enum TodoStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED'
}

// declare Todo model in detail
export interface Todo {
    content: string;
    created_date: string;
    status: TodoStatus;
    id: string;
    user_id: string;
}