import { AxiosResponse } from "axios"
import { Todo } from "../models/todo"
import axios from "../utils/axios"
import { IAPI } from "./types"

class ApiFullstack extends IAPI {
	async createTodo(content: string): Promise<Todo> {
		const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
			content,
		})

		return resp.data.data
	}

	async getTodos(): Promise<Array<Todo>> {
		const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`)

		return resp.data.data
	}

	async deleteTodo(id: string): Promise<boolean> {
		return true
	}

	async deleteTodoAll(): Promise<boolean> {
		return true
	}

	async toggleAll(isChecked: boolean): Promise<boolean> {
		return true
	}

	async toggleTodo(id: string, isChecked: boolean): Promise<boolean> {
		return true
	}

	async updateTodoContent(todoId: string, content: string): Promise<boolean> {
		return true
	}
}

export default new ApiFullstack()
