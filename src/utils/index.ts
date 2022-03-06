import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
    return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
    return todo.status === TodoStatus.ACTIVE;
}

export function localStore(namespace: string, data?: any) {
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }

    let store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
}
