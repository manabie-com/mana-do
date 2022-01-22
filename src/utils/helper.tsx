import { LocalConstants } from "../constants/constants"
import { Todo } from "../models/todo"

export const getStorage = (name: string) => {
	const res = localStorage.getItem(name)

	return res ? res : ""
}

export const setStorage = (name: string, value: string) => {
	localStorage.setItem(name, value)
}

export const getListTodos = () => {
	const todosStr = getStorage(LocalConstants.LIST_TODOS)
	return todosStr ? (JSON.parse(todosStr) as Todo[]) : []
}

export const storageTodos = (todos: Todo[]) => {
	setStorage(LocalConstants.LIST_TODOS, JSON.stringify(todos))
}
