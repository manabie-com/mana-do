import {Todo, TodoStatus} from '../models/todo';

const LOCALSTORAGE_NAMESPACE = "todos";

export function isTodoCompleted(todo: Todo): boolean {
    return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
    return todo.status === TodoStatus.ACTIVE;
}

export function localStoreData(data?: any, namespace: string = LOCALSTORAGE_NAMESPACE) {
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }

    let store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
}
