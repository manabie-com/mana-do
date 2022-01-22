import shortid from "shortid"
import { Todo, TodoStatus } from "../models/todo"
import { getListTodos, storageTodos } from "../utils/helper"
import { IAPI } from "./types"

class ApiFrontend extends IAPI {
	async createTodo(content: string): Promise<Todo> {
		const newTodo = {
			content: content,
			created_date: new Date().toISOString(),
			status: TodoStatus.ACTIVE,
			id: shortid(),
			user_id: "firstUser",
		} as Todo

		let todos = getListTodos()
		todos = [...todos, newTodo]
		storageTodos(todos)

		return Promise.resolve(newTodo)
	}

	async getTodos(): Promise<Todo[]> {
		return getListTodos()
	}

	async updateTodoContent(todoId: string, content: string): Promise<boolean> {
		const todos = getListTodos()
		const index = todos.findIndex((t) => t.id === todoId)
		todos[index].content = content
		storageTodos(todos)

		return true
	}

	async deleteTodo(id: string): Promise<boolean> {
		let todos = getListTodos()
		todos = [...todos.filter((todo) => todo.id !== id)]
		storageTodos(todos)

		return true
	}

	async deleteTodoAll(): Promise<boolean> {
		storageTodos([])
		return true
	}

	async toggleAll(isChecked: boolean): Promise<boolean> {
		let todos = getListTodos()
		todos = todos.map((todo) => ({ ...todo, status: isChecked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE }))
		storageTodos(todos)
		return true
	}

	async toggleTodo(id: string, isChecked: boolean): Promise<boolean> {
		const todos = getListTodos()
		const index = todos.findIndex((t) => t.id === id)
		todos[index].status = isChecked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
		storageTodos(todos)
		return true
	}
}

export default new ApiFrontend()
