import { FilterType, Todo, TodoStatus } from 'models/todo';
import {
	AppActions,
	SET_TODO,
	CHANGE_FILTER,
	CREATE_TODO,
	DELETE_ALL_TODOS,
	DELETE_TODO,
	TOGGLE_ALL_TODOS,
	UPDATE_TODO_STATUS,
	UPDATE_TODO_CONTENT,
} from './actions';

export interface AppState {
	todos: Array<Todo>;
	filter: FilterType;
}

export const initialState: AppState = {
	todos: [],
	filter: FilterType.ALL,
};

function reducer(state: AppState, action: AppActions): AppState {
	switch (action.type) {
		case CREATE_TODO:
			state.todos = [ ...state.todos, action.payload ];
			return {
				...state,
			};

		case SET_TODO:
			state.todos = action.payload;
			return {
				...state,
			};

		case UPDATE_TODO_STATUS:
			const updateItemIdx = state.todos.findIndex((todo) => todo.id === action.payload.todoId);

			if (updateItemIdx > -1) state.todos[updateItemIdx].status = action.payload.status;

			return {
				...state,
				todos: state.todos,
			};

		case UPDATE_TODO_CONTENT:
			const updateContentItemIdx = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
			state.todos[updateContentItemIdx].content = action.payload.content;

			return {
				...state,
				todos: state.todos,
			};

		case CHANGE_FILTER: {
			return {
				...state,
				filter: action.payload,
			};
		}

		case TOGGLE_ALL_TODOS:
			const tempTodos = state.todos.map((e) => {
				return {
					...e,
					status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
				};
			});

			return {
				...state,
				todos: tempTodos,
			};

		case DELETE_TODO:
			const foundItemIdx = state.todos.findIndex((todo) => todo.id === action.payload);
			if (foundItemIdx < 0) return state;

			state.todos.splice(foundItemIdx, 1);

			return {
				...state,
				todos: state.todos,
			};

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
