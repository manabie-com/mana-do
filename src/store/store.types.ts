import { Todo } from "../models/todo";

export enum ACTIONS {
	SET_TODO = "SET_TODO",
	CREATE_TODO = "CREATE_TODO",
	DELETE_TODO = "DELETE_TODO",
	DELETE_ALL_TODOS = "DELETE_ALL_TODOS",
	TOGGLE_ALL_TODOS = "TOGGLE_ALL_TODOS",
	UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS",
	EDIT_TODO_ITEM = "EDIT_TODO_ITEM",
}

export interface SetTodoAction {
	type: typeof ACTIONS.SET_TODO;
	payload: Array<Todo>;
}

export interface CreateTodoAction {
	type: typeof ACTIONS.CREATE_TODO;
	payload: Todo;
}

export interface UpdateTodoStatusAction {
	type: typeof ACTIONS.UPDATE_TODO_STATUS;
	payload: {
		todoId: string;
		checked: boolean;
	};
}

export interface DeleteTodoAction {
	type: typeof ACTIONS.DELETE_TODO;
	payload: string;
}

export interface DeleteAllTodosAction {
	type: typeof ACTIONS.DELETE_ALL_TODOS;
}

export interface ToggleAllTodosAction {
	type: typeof ACTIONS.TOGGLE_ALL_TODOS;
	payload: boolean;
}

export interface EditTodoItemAction {
	type: typeof ACTIONS.EDIT_TODO_ITEM;
	payload: Todo;
}

export type AppActions =
	| SetTodoAction
	| CreateTodoAction
	| UpdateTodoStatusAction
	| DeleteTodoAction
	| DeleteAllTodosAction
	| ToggleAllTodosAction
	| EditTodoItemAction;
