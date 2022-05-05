import { Todo } from "../models/todo";
import {
	ACTIONS,
	SetTodoAction,
	CreateTodoAction,
	UpdateTodoStatusAction,
	DeleteTodoAction,
	DeleteAllTodosAction,
	ToggleAllTodosAction,
	EditTodoItemAction,
} from "./store.types";

export function setTodos(todos: Array<Todo>): SetTodoAction {
	return {
		type: ACTIONS.SET_TODO,
		payload: todos,
	};
}

///////////

export function createTodo(newTodo: Todo): CreateTodoAction {
	return {
		type: ACTIONS.CREATE_TODO,
		payload: newTodo,
	};
}

//////////////

export function updateTodoStatus(
	todoId: string,
	checked: boolean
): UpdateTodoStatusAction {
	return {
		type: ACTIONS.UPDATE_TODO_STATUS,
		payload: {
			todoId,
			checked,
		},
	};
}

//////////////

export function deleteTodo(todoId: string): DeleteTodoAction {
	return {
		type: ACTIONS.DELETE_TODO,
		payload: todoId,
	};
}

//////////////

export function deleteAllTodos(): DeleteAllTodosAction {
	return {
		type: ACTIONS.DELETE_ALL_TODOS,
	};
}

///////////

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
	return {
		type: ACTIONS.TOGGLE_ALL_TODOS,
		payload: checked,
	};
}
export function editTodoItem(todoItem: Todo): EditTodoItemAction {
	return {
		type: ACTIONS.EDIT_TODO_ITEM,
		payload: todoItem,
	};
}
