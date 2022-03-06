export enum TodoStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED'
}

export interface Todo {
    //[key: string]: any,
    id: string,
    user_id: 'firstUser',
    content: string,
    status?: TodoStatus,
    created_date: string,
}
