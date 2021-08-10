import { Action, TodoReducer, Todo, TodoStatus } from "src/redux/types"

export const GET_TODOS: string = "TODO:GET_TODOS"
export const GET_TODOS_SAGA: string = "TODO:GET_TODOS_SAGA"

export const CREATE_TODO: string = "TODO:CREATE_TODO"
export const CREATE_TODO_SAGA: string = "TODO:CREATE_TODO_SAGA"

export const DELETE_TODO: string = "TODO:DELETE_TODO"
export const DELETE_ALL_TODOS: string = "TODO:DELETE_ALL_TODOS"

export const UPDATE_STATUS_TODO: string = "TODO:UPDATE_STATUS_TODO"

export const UPDATE_STATUS_TO_COMPLETED: string = "TODO:UPDATE_STATUS_TO_COMPLETED"
export const UPDATE_STATUS_TO_ACTIVE: string = "TODO:UPDATE_STATUS_TO_ACTIVE"

const initialState: TodoReducer = {
    data: []
}

const reducer = (state: TodoReducer = initialState, action: Action): TodoReducer => {
    switch (action.type) {
        case GET_TODOS_SAGA:
            return { ...state, data: action.data }
        case CREATE_TODO_SAGA:
            return { ...state, data: [action.data, ...state.data] }
        case DELETE_TODO:
            return { ...state, data: [...state.data.filter((d: Todo) => d.id !== action.data)] }
        case DELETE_ALL_TODOS:
            return { ...state, data: [] }
        case UPDATE_STATUS_TODO:
            return {
                ...state,
                data: [
                    ...state.data.map((t: Todo) => t.id === action.data ? (
                        { ...t, status: Boolean(TodoStatus.COMPLETED === action.status) ? TodoStatus.ACTIVE : TodoStatus.COMPLETED }
                    ) : ({ ...t }))]
            }
        case UPDATE_STATUS_TO_COMPLETED:
            return { ...state, data: [...state.data.map((t: Todo) => ({ ...t, status: TodoStatus.COMPLETED }))] }
        case UPDATE_STATUS_TO_ACTIVE:
            return { ...state, data: [...state.data.map((t: Todo) => ({ ...t, status: TodoStatus.ACTIVE }))] }
        default:
            return state
    }
}

export default reducer