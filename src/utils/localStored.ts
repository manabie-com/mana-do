import {Todo} from "../models/todo";


export function setLocalStorage(key: string, value: Todo[]): void  {
    if (key === undefined)
        throw new Error("Can't store value with key undefined");
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string): Array<any>  {
    if (key === undefined)
        throw new Error("Can't find the key named " + key);
    return JSON.parse(localStorage.getItem(key) || '[]');
}
