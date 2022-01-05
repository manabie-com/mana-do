import { Todo } from "models/todo"

export const getItem = (key: string) => {
    const data = localStorage.getItem(key);
    if (data == null) return;
    return JSON.parse(data);
};

export const setItem = (key: string, value: Array<Todo>) => {
    return localStorage.setItem(key, JSON.stringify(value));
};