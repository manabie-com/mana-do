import { Todo } from '../models/todo';
import {
    AppActions,
    CREATE_TODO,
    DELETE_ALL_TODOS,
    DELETE_TODO,
    TOGGLE_ALL_TODOS,
    UPDATE_TODO_STATUS,
    SET_TODO,
} from './actions';

export interface AppState {
    todos: Todo[];
}

export const initialState: AppState = {
    todos: [],
};

// Đưa việc xử lý thêm data vào các hàm trong file actions.ts,
// tránh trường hợp reducer thực thi 2 lần trong 1 lần gọi dispatch
// Có thể bỏ <React.StrictMode> trong file index.tsx để hàm reducer chỉ thực thi 1 lần, tuy nhiên không nên
function reducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
        case CREATE_TODO:
            return {
                ...state,
                todos: action.payload,
            };

        case UPDATE_TODO_STATUS:
            return {
                ...state,
                todos: action.payload,
            };

        case TOGGLE_ALL_TODOS:
            return {
                ...state,
                todos: action.payload,
            };

        case DELETE_TODO:
            return {
                ...state,
                todos: action.payload,
            };
        case DELETE_ALL_TODOS:
            return {
                ...state,
                todos: [],
            };

        case SET_TODO:
            return {
                ...state,
                todos: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
