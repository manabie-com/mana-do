import { Todo, TodoStatus } from "../models/todo";
import { AppActions, ACTIONS } from "./store.types";
import { setLocalStorage } from "../utils";

export interface AppState {
	todos: Array<Todo>;
}

export const initialState: AppState = {
	todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
	switch (action.type) {
		case ACTIONS.SET_TODO:
			return {
				...state,
				todos: action.payload,
			};
		case ACTIONS.CREATE_TODO:
			//Use spread operator to add new todo instead using push
			setLocalStorage("todos", [...state.todos, action.payload]);
			return {
				...state,
				todos: [...state.todos, action.payload],
			};

		case ACTIONS.UPDATE_TODO_STATUS:
			{
				const index2 = state.todos.findIndex((todo) => {
					return todo.id === action.payload.todoId;
				});
				state.todos[index2].status = action.payload.checked
					? TodoStatus.COMPLETED
					: TodoStatus.ACTIVE;
			}
			setLocalStorage("todos", [...state.todos]);
			return {
				...state,
				todos: state.todos,
			};

		case ACTIONS.TOGGLE_ALL_TODOS: {
			const tempTodos = state.todos.map((e) => {
				return {
					...e,
					status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
				};
			});

			setLocalStorage("todos", [...tempTodos]);
			return {
				...state,
				todos: tempTodos,
			};
		}

		case ACTIONS.DELETE_TODO: {
			/// Use filter to create new todo list
			const newTodo = [...state.todos].filter(
				(todo) => todo.id !== action.payload
			);
			setLocalStorage("todos", [...newTodo]);
			return {
				...state,
				todos: newTodo,
			};
		}

		case ACTIONS.DELETE_ALL_TODOS:
			setLocalStorage("todos", []);
			return {
				...state,
				todos: [],
			};

		case ACTIONS.EDIT_TODO_ITEM: {
			const editedTodos = [...state.todos].find(
				(todoItem) => todoItem.id === action.payload.id
			);
			if (editedTodos) {
				editedTodos.content = action.payload.content;
			}
			setLocalStorage("todos", [...state.todos]);
			return {
				...state,
				todos: [...state.todos],
			};
		}
		default:
			return state;
	}
}

export default reducer;
