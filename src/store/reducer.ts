import { Todo, TodoStatus } from "models/todo";
import {
	AppActions,
	CREATE_TODO,
	DELETE_TODOS,
	TOGGLE_ALL_TODOS,
	UPDATE_TODO_STATUS,
	TOGGLE_TICK_TODO,
	TOGGLE_TICK_ALL_TODOS,
	SET_TODO,
	UPDATE_TODO,
} from "./actions";

export interface AppState {
	selectedItemIds: string[];
	todos: Array<Todo>;
}

export const initialState: AppState = {
	selectedItemIds: [],
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
						status: action.payload.status,
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

		case TOGGLE_TICK_TODO: {
			const { id: currentTodoId, checked } = action.payload;
			let itemsExist = false;
			const ids = state.selectedItemIds.filter((item) => {
				if (item === currentTodoId) {
					itemsExist = true;
					return checked;
				}
				return true;
			});

			if (!itemsExist && checked) {
				ids.push(currentTodoId);
			}

			return {
				...state,
				selectedItemIds: ids,
			};
		}
		case TOGGLE_TICK_ALL_TODOS: {
			const { checked } = action.payload;
			const ids = checked ? state.todos.map((todo: Todo) => todo.id) : [];

			return {
				...state,
				selectedItemIds: ids,
			};
		}

		case SET_TODO: {
			return {
				...state,
				todos: [...action.payload],
			};
		}

		case UPDATE_TODO: {
			const { id, newData } = action.payload;
			return {
				...state,
				todos: state.todos.map((item) => {
					if (item.id === id) {
						return {
							...item,
							...newData,
							id,
						};
					}
					return {
						...item,
					};
				}),
			};
		}

		case DELETE_TODOS: {
			const ids = action.payload;
			return {
				...state,
				todos: state.todos.filter((item) => ids.indexOf(item.id) < 0),
			};
		}

		default:
			return state;
	}
}

export default reducer;
