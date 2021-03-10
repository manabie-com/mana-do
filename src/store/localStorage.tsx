import { Todo, TodoStatus } from "../models/todo";
import { AppState, initialState } from "./reducer";

export const loadState = () => {
    try {
        let preloadedState
        const persistedTodosString = localStorage.getItem('todos')
        if (persistedTodosString) {
            preloadedState = {
                todos: JSON.parse(persistedTodosString)
            }
        }
        return preloadedState;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        const clonedList = loadState();
        var list: any = []
        if (clonedList) {
            list = clonedList.todos;
            list.push(state);
            localStorage.setItem('todos', JSON.stringify(list));
        } else {
            list.push(state);
            localStorage.setItem('todos', JSON.stringify(list));
        }
    } catch (error) {
        return undefined;
    }
}

export const deleteAllState = () => {
    try {
        const clonedList = loadState();
        if (clonedList) {
            localStorage.removeItem('todos');
        }
    } catch (error) {

    }
}

export const deleteSpecificInState = (id: any) => {
    try {
        const clonedList = loadState();
        if (clonedList) {
            var newList = clonedList.todos
            newList = newList.filter((todo: Todo) => todo.id !== id)
            localStorage.setItem('todos', JSON.stringify(newList));
        }

    } catch (error) {

    }
}

export const toggleAllTodo = (status: any) => {
    try {
        const clonedList = loadState();
        if (clonedList) {
            var newList = clonedList.todos.map((todo: Todo) => {
                todo.status = status ? TodoStatus.COMPLETED : TodoStatus.COMPLETED;
            })
            localStorage.setItem('todos', JSON.stringify(newList));
        }
    } catch (error) {

    }
}

export const updateTodoStatus = (id: any, checked: boolean) => {
    try {
        const clonedList = loadState();
        if (clonedList) {
            var newList = [...clonedList.todos];
            var index = newList.map((todo: Todo, index: any) => {
                if (todo.id == id) return index;
            }).shift();

            newList[index].status = checked
                ? TodoStatus.COMPLETED
                : TodoStatus.ACTIVE;
            localStorage.setItem('todos', JSON.stringify(newList));
        }

    } catch (error) {

    }
}

export const updateTodo = (id: any, content: string) => {
    try {
        const clonedList = loadState();
        if (clonedList) {
            var newList = [...clonedList.todos];
            var index = newList.map((todo: Todo, index: any) => {
                if (todo.id == id) return index;
            }).shift();
            newList[index].content = content;
            localStorage.setItem('todos', JSON.stringify(newList));
        }
    } catch (error) {

    }
}
