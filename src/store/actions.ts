import { Todo, TodoStatus } from '../models/todo';
import Service from '../service';

export const SET_TODO = 'SET_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';

export interface SetTodoAction {
    type: typeof SET_TODO;
    payload: Array<Todo>;
}

export function setTodos(todos: Array<Todo>): SetTodoAction {
    return {
        type: SET_TODO,
        payload: todos,
    };
}

///////////
export interface CreateTodoAction {
    type: typeof CREATE_TODO;
    payload: Todo[];
}

export function addTodo(todos: Todo[], newTodo: Todo): CreateTodoAction {
    return {
        type: CREATE_TODO,
        payload: [...todos, newTodo],
    };
}

//////////////
export interface UpdateTodoStatusAction {
    type: typeof UPDATE_TODO_STATUS;
    payload: Todo[];
}

export function updateTodoStatus(
    todos: Todo[],
    todoId: string,
    checked: boolean
): UpdateTodoStatusAction {
    const todo = todos.find((todo) => todo.id === todoId);
    if (todo) {
        todo.status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        Service.updateTodos(todos);
    }

    return {
        type: UPDATE_TODO_STATUS,
        payload: todos,
    };
}

//////////////
export interface DeleteTodoAction {
    type: typeof DELETE_TODO;
    payload: Todo[];
}

export function deleteTodo(todos: Todo[], todoId: string): DeleteTodoAction {
    const index = todos.findIndex((todo: Todo) => todo.id === todoId);
    todos.splice(index, 1);
    Service.deleteTodo(todoId);

    return {
        type: DELETE_TODO,
        payload: todos,
    };
}

//////////////
export interface DeleteAllTodosAction {
    type: typeof DELETE_ALL_TODOS;
}

export function deleteAllTodos(): DeleteAllTodosAction {
    Service.deleteAll();
    return {
        type: DELETE_ALL_TODOS,
    };
}

///////////
export interface ToggleAllTodosAction {
    type: typeof TOGGLE_ALL_TODOS;
    payload: Todo[];
}

export function toggleAllTodos(todos: Todo[], checked: boolean): ToggleAllTodosAction {
    todos.forEach((todo) => {
        todo.status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    });

    Service.updateTodos(todos);

    return {
        type: TOGGLE_ALL_TODOS,
        payload: todos,
    };
}

export type AppActions =
    | SetTodoAction
    | CreateTodoAction
    | UpdateTodoStatusAction
    | DeleteTodoAction
    | DeleteAllTodosAction
    | ToggleAllTodosAction;
