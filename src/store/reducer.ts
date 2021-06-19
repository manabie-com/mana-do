import {Todo, TodoStatus} from '../models/todo';
import {
    AppActions,
    CREATE_TODO,
    CreateTodoAction,
    DELETE_ALL_TODOS,
    DELETE_TODO,
    DeleteTodoAction,
    EDITED_TODO,
    EditedTodoAction,
    SELECT_EDIT_TODO,
    SelectTodoEditAction,
    SET_TODO, SetTodoAction,
    TOGGLE_ALL_TODOS,
    ToggleAllTodosAction,
    UPDATE_TODO_STATUS,
    UpdateTodoStatusAction
} from './actions';

export interface AppState {
    todos: Array<Todo>
    editTodo: string,
    loaded:boolean
}

export const initialState: AppState = {
    todos: [],
    editTodo: '',
    loaded:false
}
const handleSetTodo = (state: AppState, action: AppActions): AppState => {
    const todos= (action as SetTodoAction).payload
    return {
        ...state,
        todos,
        loaded:true
    };
}

const handleCreateTodo = (state: AppState, action: AppActions): AppState => {
    if ("payload" in action) {
        //Fix: duplicate add todos
        const newTodo = (action as CreateTodoAction).payload;
        const updateTodos = [...state.todos, newTodo]
        return {
            ...state,
            todos: updateTodos
        }
    }
    return {
        ...state
    };
}
const handleUpdateTodoStatus = (state: AppState, action: AppActions): AppState => {
    // Refactor code
    const {checked,todoId} = (action as UpdateTodoStatusAction).payload
    const nextTodos= [...state.todos];
    const todo= nextTodos.find(todo=>todo.id===todoId);
    if(todo){
        todo.status=checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    }

    return {
        ...state,
        todos: nextTodos
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
    // Fix delete todos
    const id=(action as DeleteTodoAction).payload;
    const remainTodos= state.todos.filter(todo=>todo.id!==id);
    return {
        ...state,
        todos: remainTodos
    }
}

const handleDeleteAllTodos = (state: AppState, action: AppActions): AppState => {
    return {
        ...state,
        todos: []
    }
}
const handleSelectedTodo = (state: AppState, action: AppActions): AppState => {
    return {
        ...state,
        editTodo: (action as SelectTodoEditAction).payload
    }
}
const handleEditedTodo = (state: AppState, action: AppActions): AppState => {

    const newTodos = [...state.todos];
    const todo = newTodos.find(todo => todo.id === (action as EditedTodoAction).payload.todoId);
    if (todo) {
        todo.content = (action as EditedTodoAction).payload.newValue;
    }
    return {
        ...state,
        todos: newTodos
    }
}


function reducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
        case SET_TODO:
            return handleSetTodo(state, action);
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
        case SELECT_EDIT_TODO:
            return handleSelectedTodo(state, action);
        case EDITED_TODO:
            return handleEditedTodo(state, action);

        default:
            return state;
    }
}

export default reducer;