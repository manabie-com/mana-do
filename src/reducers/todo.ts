import { Todo, TodoStatus } from '../models/todo';
import { Action } from '../actions/commons';
import { ActionTypes } from '../constants';

export interface AppState {
    todos: Array<Todo>
}

function reducer(state: AppState, action: Action<any>): AppState {
    let findedIndex = -1;
    let todos: Todo[] = [];
    switch (action.type) {
        case ActionTypes.SET_TODO:
            return {
                ...state,
                todos: action.payload
            }

        case ActionTypes.CREATE_TODO:
            todos = [...state.todos, action.payload];
            return {
                ...state,
                todos
            };

        case ActionTypes.UPDATE_TODO_STATUS:
            todos = [...state.todos];
            findedIndex = todos.findIndex((todo) => todo.id === action.payload.todoId);
            if (findedIndex !== -1) {
                todos[findedIndex].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
            }

            return {
                ...state,
                todos
            }

        case ActionTypes.TOGGLE_ALL_TODOS:
            todos = state.todos.map((e) => {
                return {
                    ...e,
                    status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
                }
            })

            return {
                ...state,
                todos
            }

        case ActionTypes.DELETE_TODO:
            findedIndex = state.todos.findIndex((todo) => todo.id === action.payload);
            todos = [...state.todos];
            if (findedIndex !== -1) {
                todos.splice(findedIndex, 1);
            }

            return {
                ...state,
                todos
            }
        case ActionTypes.DELETE_ALL_TODOS:
            return {
                ...state,
                todos: []
            }
        default:
            return state;
    }
}

export default reducer;