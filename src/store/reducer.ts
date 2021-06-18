import {Todo, TodoStatus} from '../models/todo';
import {
    AppActions,
    CREATE_TODO, CreateTodoAction,
    DELETE_ALL_TODOS,
    DELETE_TODO, DeleteTodoAction,
    TOGGLE_ALL_TODOS, ToggleAllTodosAction,
    UPDATE_TODO_STATUS, UpdateTodoStatusAction
} from './actions';

export interface AppState {
    todos: Array<Todo>
}

export const initialState: AppState = {
    todos: []
}
const handleCreateTodo = (state: AppState, action: AppActions): AppState => {
    if ("payload" in action) {
        state.todos.push((action as CreateTodoAction).payload);
    }
    return {
        ...state
    };
}
const handleUpdateTodoStatus = (state: AppState, action: AppActions): AppState => {
    const index2 = state.todos.findIndex((todo) => todo.id === (action as UpdateTodoStatusAction).payload.todoId);
    if ("payload" in action) {
        state.todos[index2].status = (action as UpdateTodoStatusAction).payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    }

    return {
        ...state,
        todos: state.todos
    }
}

const handleToggleAllTodos = (state: AppState, action: AppActions): AppState => {
    const tempTodos = state.todos.map((e) => {
        return {
            ...e,
            status: (action as ToggleAllTodosAction).payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
    })

    return {
        ...state,
        todos: tempTodos
    }
}

const handleDeleteTodos = (state: AppState, action: AppActions): AppState => {
    const index1 = state.todos.findIndex((todo) => todo.id === (action as DeleteTodoAction).payload);
    state.todos.splice(index1, 1);

    return {
        ...state,
        todos: state.todos
    }
}

const handleDeleteAllTodos = (state: AppState, action: AppActions): AppState => {
    return {
        ...state,
        todos: []
    }
}

function reducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
        case CREATE_TODO:
            return handleCreateTodo(state, action);

        case UPDATE_TODO_STATUS:
            return handleUpdateTodoStatus(state, action);

        case TOGGLE_ALL_TODOS:
            return handleToggleAllTodos(state, action);

        case DELETE_TODO:
            return handleDeleteTodos(state, action);

        case DELETE_ALL_TODOS:
            return handleDeleteAllTodos(state, action);
        default:
            return state;
    }
}

export default reducer;