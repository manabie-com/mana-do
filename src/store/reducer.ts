import { Todo, TodoStatus } from "../models/todo"
import {
	AppActions,
	CREATE_TODO,
	DELETE_ALL_TODOS,
	DELETE_TODO,
	SET_TODO,
	TOGGLE_ALL_TODOS,
	UPDATE_TODO_CONTENT,
	UPDATE_TODO_STATUS,
} from "./actions"

export interface AppState {
	todos: Array<Todo>
}

export const initialState: AppState = {
	todos: [],
}

/* The reason generate bug */
/**
 The function reducer below is impure reducer. So React.StrictMode intentionally calls your reducer twice to make any unexpected side effects more  apparent. And the result is created two to-dos when you press enter to create a todo.
 Solution: Make the function reducer is pure reducer.
*/

function reducer(state: AppState, action: AppActions): AppState {
	switch (action.type) {
		case SET_TODO: {
			return {
				...state,
				todos: [...action.payload],
			}
		}

		case CREATE_TODO: {
			const todos = [...state.todos, action.payload]
			return {
				...state,
				todos,
			}
		}

		case UPDATE_TODO_CONTENT: {
			const todos = [
				...state.todos.filter((todo) => {
					if (todo.id === action.payload.todoId) todo.content = action.payload.content

					return todo
				}),
			]

			return { ...state, todos }
		}

		case UPDATE_TODO_STATUS: {
			const todos = [
				...state.todos.filter((todo) => {
					if (todo.id === action.payload.todoId)
						todo.status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE

					return todo
				}),
			]

			return { ...state, todos }
		}

		case TOGGLE_ALL_TODOS: {
			const status = action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE

			const todos = [...state.todos.map((todo) => ({ ...todo, status }))]

			return { ...state, todos }
		}

		case DELETE_TODO: {
			const todo = [...state.todos.filter((todo) => todo.id !== action.payload)]
			return {
				...state,
				todos: todo,
			}
		}

		case DELETE_ALL_TODOS:
			return {
				...state,
				todos: [],
			}

		default:
			return state
	}
}

export default reducer
