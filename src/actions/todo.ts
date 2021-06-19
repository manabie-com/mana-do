import {Dispatch} from "react";
import Service from "../service";
import {
    createTodo,
    deleteAllTodos,
    deleteTodo, editedTodo,
    selectTodoEdit,
    setTodos,
    toggleAllTodos,
    updateTodoStatus
} from "../store/actions";
import {Todo, TodoStatus} from "../models/todo";

export const loadTodosAction = (dispatch: Dispatch<any>) => async () => {
    const resp = await Service.getTodos();
    const action = setTodos(resp);
    dispatch(action);
}

export const createTodoAction = (dispatch: Dispatch<any>) => async (value: string) => {
    const resp = await Service.createTodo(value);
    const action = createTodo(resp);
    dispatch(action);
}
export const updateTodoStatusAction = (dispatch: Dispatch<any>) => async (todoId: string, value: boolean | TodoStatus) => {
    // check value type when user update status via other ways;
    const resp: boolean = typeof value === 'boolean' ? value : (value === TodoStatus.COMPLETED)
    const action = updateTodoStatus(todoId, resp);
    dispatch(action);
}

export const toggleAllTodosAction = (dispatch: Dispatch<any>) => async (value: boolean) => {
    const action = toggleAllTodos(value);
    dispatch(action);
}
export const deleteTodoAction = (dispatch: Dispatch<any>) => async (todoId: string) => {
    const action = deleteTodo(todoId);
    dispatch(action);
}

export const deleteAllTodosAction = (dispatch: Dispatch<any>) => async () => {
    const action = deleteAllTodos();
    dispatch(action);
}

///// edit feature
export const selectTodoEditAction = (dispatch: Dispatch<any>) => async (todoId: string) => {
    const action = selectTodoEdit(todoId);
    dispatch(action);
}

export const editTodoAction = (dispatch: Dispatch<any>) => async (todoId: string, value: string) => {
    const action = editedTodo(todoId, value);
    dispatch(action);
}
// store local
export const syncTodosToLocal = (todos: Array<Todo>) => {
    console.log('syncTodosToLocal',todos)
    window.localStorage.setItem('todos', JSON.stringify(todos || []));
}