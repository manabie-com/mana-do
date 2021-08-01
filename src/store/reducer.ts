/*
    I created some seperated funtions for each action type to make the reducer cleaner.
*/

import { Todo, TodoStatus } from '../models/todo';
import { AppActions, CreateTodoAction, DeleteAllTodosAction, DeleteTodoAction, EditTodoAction, GetSingleTodoAction, GetTodosAction, ToggleAllTodosAction, UpdateTodoStatusAction } from './actionInterfaces';
import {
    CREATE_TODO,
    GET_TODOS,
    GET_SINGLE_TODO,
    EDIT_TODO,
    DELETE_ALL_TODOS,
    DELETE_TODO,
    TOGGLE_ALL_TODOS,
    UPDATE_TODO_STATUS
} from './actionTypes';

import { extractLocalStorageItem } from '../utils/extractLocalStorageItem';
import { hasLocalStorage } from '../utils/hasLocalStorage';

export interface AppState {
    todos: Array<Todo>,
    todo: Todo,
}

export const initialState: AppState = {
    todos: [],
    todo: {
        id: '',
        user_id: '',
        content: '',
        status: TodoStatus.ACTIVE,
        created_date: ''
    }
}

const getTodos = (state: AppState, action: GetTodosAction): AppState => {
    const parsedLocalItem = extractLocalStorageItem('todo');
    const token = localStorage.getItem('token');
    if (parsedLocalItem && token) {
        return {
            ...state,
            todos: parsedLocalItem
        }
    }
    return state;
}

const getSingleTodo = (state: AppState, action: GetSingleTodoAction): AppState => {
    const todoIndex = state.todos.findIndex(todo => todo.id === action.payload)
    return {
        ...state,
        todo: { ...state.todos[todoIndex] }
    }
}

const editTodo = (state: AppState, action: EditTodoAction): AppState => {
    const clonedTodos = [...state.todos];
    const todoEditIndex = clonedTodos.findIndex(todo => todo.id === action.payload.id)
    clonedTodos[todoEditIndex].content = action.payload.content;
    const parsedLocalItem = extractLocalStorageItem('todo');
    const token = localStorage.getItem('token');
    if (parsedLocalItem && token) {
        localStorage.setItem('todo', JSON.stringify(clonedTodos));
    }
    if (token) {
        return {
            ...state,
            todos: clonedTodos,
        }
    }
    return state
}

const createTodo = (state: AppState, action: CreateTodoAction): AppState => {
    // I has changed "push" method to "concat" method to fix the bug which occurs when user created a todo.
    const createdTodo = state.todos.concat(action.payload);
    const token = localStorage.getItem('token');
    if (hasLocalStorage && token) {
        localStorage.setItem('todo', JSON.stringify(createdTodo));
    }
    if (token) {
        return {
            ...state,
            todos: createdTodo,
        };
    }
    return state
}

const updateTodoStatus = (state: AppState, action: UpdateTodoStatusAction): AppState => {
    const clonedTodos = [...state.todos];
    const todoIndex = clonedTodos.findIndex((todo) => todo.id === action.payload.todoId);
    clonedTodos[todoIndex].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    const parsedLocalItem = extractLocalStorageItem('todo');
    const token = localStorage.getItem('token');
    if (parsedLocalItem && token) {
        localStorage.setItem('todo', JSON.stringify(clonedTodos));
    }
    if (token) {
        return {
            ...state,
            todos: clonedTodos
        }
    }
    return state
}

const toggleAllTodos = (state: AppState, action: ToggleAllTodosAction): AppState => {
    const tempTodos = state.todos.map((todo) => {
        return {
            ...todo,
            status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
    })
    const parsedLocalItem = extractLocalStorageItem('todo');
    const token = localStorage.getItem('token');
    if (parsedLocalItem && token) {
        localStorage.setItem('todo', JSON.stringify(tempTodos));
    }
    if (token) {
        return {
            ...state,
            todos: tempTodos
        }
    }
    return state
}

const deleteTodo = (state: AppState, action: DeleteTodoAction): AppState => {
    const updatedTodoItems = state.todos.filter((todo) => todo.id !== action.payload);
    const parsedLocalItem = extractLocalStorageItem('todo');
    const token = localStorage.getItem('token');
    if (parsedLocalItem && token) {
        localStorage.setItem('todo', JSON.stringify(updatedTodoItems));
    }
    if (token) {
        return {
            ...state,
            todos: updatedTodoItems
        }
    }
    return state
}

const deleteAllTodos = (state: AppState, action: DeleteAllTodosAction): AppState => {
    const token = localStorage.getItem('token');
    if (token) {
        localStorage.removeItem('todo');
        return {
            ...state,
            todos: []
        }
    }
    return state
}

function reducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
        case GET_TODOS:
            return getTodos(state, action);
        case GET_SINGLE_TODO:
            return getSingleTodo(state, action);
        case EDIT_TODO:
            return editTodo(state, action)
        case CREATE_TODO:
            return createTodo(state, action)
        case UPDATE_TODO_STATUS:
            return updateTodoStatus(state, action)
        case TOGGLE_ALL_TODOS:
            return toggleAllTodos(state, action)
        case DELETE_TODO:
            return deleteTodo(state, action)
        case DELETE_ALL_TODOS:
            return deleteAllTodos(state, action)
        default:
            return state;
    }
}

export default reducer;