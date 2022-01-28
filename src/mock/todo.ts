import { Todo, TodoStatus } from "../models/todo";

export const mockTodoList: Array<Todo> = 
    [
        {
            id: "1",
            status: TodoStatus.COMPLETED,
            content: 'test task',
            created_date: '01-01-2022',
            user_id: '2'
        },
        {
            id: "2",
            status: TodoStatus.ACTIVE,
            content: 'test task 2',
            created_date: '01-01-2022',
            user_id: '2'
        }
    ];
