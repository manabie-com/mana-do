import {Todo} from '../models/todo';
import {
    AppActions,
    CREATE_TODO,
    DELETE_ALL_TODOS,
    DELETE_TODO, SET_TODO,
    TOGGLE_ALL_TODOS,
    UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
    todos: Array<Todo>
}

export const initialState: AppState = {
    todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
        case CREATE_TODO:
            return {
                todos: action.payload as Todo[],
            }

        case UPDATE_TODO_STATUS:
            return {
                ...state,
                todos: action.payload as Todo[],
            }

        case TOGGLE_ALL_TODOS:
            return {
                ...state,
                todos: action.payload as Todo[],
            }

        case DELETE_TODO:
            return {
                ...state,
                todos: action.payload as Todo[]
            }
        case DELETE_ALL_TODOS:
            return {
                ...state,
                todos: []
            }
        case SET_TODO:
            return {
                ...state,
                todos: action.payload as Todo[]
            }
        default:
            return state;
    }
}

export default reducer;