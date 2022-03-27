import { Todo, TodoStatus } from "../models/todo";
import {
    AppActions,
    CREATE_TODO,
    DELETE_ALL_TODOS,
    DELETE_TODO,
    TOGGLE_ALL_TODOS,
    UPDATE_TODO_STATUS,
    FILTER_TODO,
    SET_TODO,
    UPDATE_TODO,
} from "./actions";

export interface AppState {
    todos: Array<Todo>;
}

export const initialState: AppState = {
    todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
        case CREATE_TODO:
            state.todos.push(action.payload);

            localStorage.setItem("todos", JSON.stringify(state.todos));

            return {
                ...state,
            };
        case UPDATE_TODO:
            const idx = state.todos.findIndex(
                (todo) => todo.id === action.payload.todoId
            );
            if (idx !== -1) {
                state.todos[idx].content = action.payload.content;
            }
            localStorage.setItem("todos", JSON.stringify(state.todos));
            return {
                ...state,
                todos: state.todos,
            };
        case UPDATE_TODO_STATUS:
            const index2 = state.todos.findIndex(
                (todo) => todo.id === action.payload.todoId
            );
            state.todos[index2].status = action.payload.checked
                ? TodoStatus.COMPLETED
                : TodoStatus.ACTIVE;
            localStorage.setItem("todos", JSON.stringify(state.todos));
            return {
                ...state,
                todos: state.todos,
            };

        case TOGGLE_ALL_TODOS:
            const tempTodos = state.todos.map((e) => {
                return {
                    ...e,
                    status: action.payload
                        ? TodoStatus.COMPLETED
                        : TodoStatus.ACTIVE,
                };
            });
            localStorage.setItem("todos", JSON.stringify(tempTodos));
            return {
                ...state,
                todos: tempTodos,
            };

        case DELETE_TODO:
            const index1 = state.todos.findIndex(
                (todo) => todo.id === action.payload
            );
            if (index1 !== -1) state.todos.splice(index1, 1);

            localStorage.setItem("todos", JSON.stringify(state.todos));
            return {
                ...state,
                todos: state.todos,
            };
        case DELETE_ALL_TODOS:
            localStorage.setItem("todos", JSON.stringify([]));
            return {
                ...state,
                todos: [],
            };
        case FILTER_TODO:
            state.todos.forEach((todo) => {
                todo.show = true;
            });

            if (action.payload !== "ALL") {
                state.todos.forEach((todo) => {
                    if (todo.status !== action.payload) {
                        todo.show = false;
                    }
                });
            }
            return {
                ...state,
                todos: state.todos,
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
