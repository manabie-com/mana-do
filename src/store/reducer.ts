import { Todo, TodoStatus } from "models/todo";
import {
	AppActions,
	CREATE_TODO,
	DELETE_ALL_TODOS,
	DELETE_TODO,
	TOGGLE_ALL_TODOS,
	UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
	todos: Array<Todo>;
}

export const initialState: AppState = {
	todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
	switch (action.type) {
		case CREATE_TODO: {
			const { todos } = state;
			return {
				...state,
				todos: [
					...todos,
					{
						...action.payload,
					},
				],
			};
		}

		case UPDATE_TODO_STATUS: {
			const todos = state.todos.map((todo) => {
				if (todo.id === action.payload.todoId) {
					return {
						...todo,
						status: action.payload.checked
							? TodoStatus.COMPLETED
							: TodoStatus.ACTIVE,
					};
				}

				return {
					...todo,
				};
			});

			return {
				...state,
				todos: todos,
			};
		}

		case TOGGLE_ALL_TODOS:
			const tempTodos = state.todos.map((e) => {
				return {
					...e,
					status: action.payload
						? TodoStatus.COMPLETED
						: TodoStatus.ACTIVE,
				};
			});

			return {
				...state,
				todos: tempTodos,
			};

		case DELETE_TODO: {
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};
		}

		case DELETE_ALL_TODOS:
			return {
				...state,
				todos: [],
			};
		default:
			return state;
	}
}

export default reducer;
