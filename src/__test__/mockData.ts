import { Todo, TodoStatus } from "../models/todo";

export const mockUser = {
    validUser: {
        userId: "firstUser",
        password: "example",
    },
    invalidUser: {
        userId: "wrong userId",
        password: "wrong password",
    },
    token: 'testabc.xyz.ahk'
}

export const mockTodos: Todo[] = [
    {
        content: "tesing 1",
        created_date: "2021-10-28T07:28:01.065Z",
        status: TodoStatus.COMPLETED,
        id: "IOJj_prN0",
        user_id: "firstUser",
    },
    {
        content: "testing 2",
        created_date: "2021-10-28T07:28:02.929Z",
        status: TodoStatus.ACTIVE,
        id: "JqnFcE-IO",
        user_id: "firstUser",
    }
];