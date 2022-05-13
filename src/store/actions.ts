import { Todo, TodoStatus } from "models/todo";

export const SET_TODO = "SET_TODO";
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODOS = "DELETE_TODOS";
export const DELETE_ALL_TODOS = "DELETE_ALL_TODOS";
export const TOGGLE_ALL_TODOS = "TOGGLE_ALL_TODOS";
export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";
export const TOGGLE_TICK_TODO = "TOGGLE_TICK_TODO";
export const TOGGLE_TICK_ALL_TODOS = "TOGGLE_TICK_ALL_TODOS";
export const UPDATE_TODO = "UPDATE_TODO";

export interface SetTodoAction {
	type: typeof SET_TODO;
	payload: Array<Todo>;
}

export function setTodos(todos: Array<Todo>): SetTodoAction {
	return {
		type: SET_TODO,
		payload: todos,
	};
}

///////////
export interface CreateTodoAction {
	type: typeof CREATE_TODO;
	payload: Todo;
}

export function createTodo(newTodo: Todo): CreateTodoAction {
	return {
		type: CREATE_TODO,
		payload: newTodo,
	};
}

//////////////
export interface UpdateTodoStatusAction {
	type: typeof UPDATE_TODO_STATUS;
	payload: {
		todoId: string;
		status: TodoStatus;
	};
}

export function updateTodoStatus(
	todoId: string,
	status: TodoStatus,
): UpdateTodoStatusAction {
	return {
		type: UPDATE_TODO_STATUS,
		payload: {
			todoId,
			status,
		},
	};
}

//////////////
export interface DeleteTodosAction {
	type: typeof DELETE_TODOS;
	payload: string[];
}

export function deleteTodos(todoIds: string[]): DeleteTodosAction {
	return {
		type: DELETE_TODOS,
		payload: todoIds,
	};
}

//////////////
export interface DeleteAllTodosAction {
	type: typeof DELETE_ALL_TODOS;
}

export function deleteAllTodos(): DeleteAllTodosAction {
	return {
		type: DELETE_ALL_TODOS,
	};
}

///////////
export interface ToggleAllTodosAction {
	type: typeof TOGGLE_ALL_TODOS;
	payload: boolean;
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
	return {
		type: TOGGLE_ALL_TODOS,
		payload: checked,
	};
}

///////////
export interface ToggleTickTodoAction {
	type: typeof TOGGLE_TICK_TODO;
	payload: {
		id: string;
		checked: boolean;
	};
}
export function toggleTickTodoAction(
	id: string,
	checked: boolean,
): ToggleTickTodoAction {
	return {
		type: TOGGLE_TICK_TODO,
		payload: {
			id,
			checked,
		},
	};
}

///////////
export interface ToggleTickALLTodosAction {
	type: typeof TOGGLE_TICK_ALL_TODOS;
	payload: {
		checked: boolean;
	};
}
export function toggleTickALLTodosAction(
	checked: boolean,
): ToggleTickALLTodosAction {
	return {
		type: TOGGLE_TICK_ALL_TODOS,
		payload: {
			checked,
		},
	};
}

///////////
export interface UpdateTodoAction {
	type: typeof UPDATE_TODO;
	payload: {
		id: string;
		newData: Partial<Todo>;
	};
}
export function updateTodoAction(
	id: string,
	newData: Partial<Todo>,
): UpdateTodoAction {
	return {
		type: UPDATE_TODO,
		payload: {
			id,
			newData,
		},
	};
}

export type AppActions =
	| SetTodoAction
	| CreateTodoAction
	| UpdateTodoStatusAction
	| DeleteTodosAction
	| DeleteAllTodosAction
	| ToggleAllTodosAction
	| ToggleTickTodoAction
	| ToggleTickALLTodosAction
	| UpdateTodoAction;
