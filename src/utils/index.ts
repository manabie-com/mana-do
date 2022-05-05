import { Todo, TodoStatus } from "../models/todo";

export function isTodoCompleted(todo: Todo): boolean {
	return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
	return todo.status === TodoStatus.ACTIVE;
}

function tryParseJSONObject(jsonString: string) {
	try {
		const o = JSON.parse(jsonString);
		if (o && typeof o === "object") {
			return o;
		}
	} catch (e) {
		console.log(e);
	}

	return false;
}

export function setLocalStorage(item: string, payload: Array<Todo>) {
	const stringTransformPayload = JSON.stringify(payload);
	localStorage.setItem(item, stringTransformPayload);
}

export function getLocalStorage(item: string) {
	const todos = localStorage.getItem(item) || "";
	if (tryParseJSONObject(todos)) {
		return JSON.parse(todos);
	}
}
