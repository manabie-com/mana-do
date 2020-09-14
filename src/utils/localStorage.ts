import { Todo } from '../models/todo';

export const setToken = (token: string) => {
    localStorage.setItem('token', token)
}

export const getToken = () => {
    const token = localStorage.getItem('token');
    return token !== null ? token : null;
}

export const getTodosFromLS = () => {
    const localTotos = localStorage.getItem('todos');
    return localTotos !== null ? JSON.parse(localTotos) : [];
}

export const setTodosToLS = (todos: Array<Todo>) => {
    localStorage.setItem("todos", JSON.stringify(todos));
}