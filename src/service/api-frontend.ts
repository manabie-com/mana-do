import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import { CreateTodoResponse, DeleteTodoResponse } from '../models/apiResponse';
import storageService from './storageService';

class ApiFrontend extends IAPI {
	async createTodo(content: string): Promise<CreateTodoResponse> {
		if (content) {
			const newTodo: Todo = {
				content: content,
				created_date: new Date().toISOString(),
				status: TodoStatus.ACTIVE,
				id: shortid(),
				user_id: 'firstUser'
			}

			const todoList = storageService.todoList
			todoList?.push(newTodo)
			storageService.todoList = todoList

			return Promise.resolve({
				status: "success",
				message: "Create todo successful",
				data: newTodo
			} as CreateTodoResponse);
		}

		return Promise.resolve({
			status: "error",
			message: "Create fail",
			data: {}
		} as CreateTodoResponse);
	}

	async updateTodo(data:{ todoId: string, content?: string, status?: TodoStatus}): Promise<CreateTodoResponse> {
		const {todoId, content, status} = data

		const todoList = storageService.todoList || []
		const index = todoList?.findIndex(todo => todo.id === todoId)

		if (index >= 0) {
			if( content ) {
				todoList[index].content = content
			}
			if(status) {
				todoList[index].status = status
			}
			storageService.todoList = todoList
			return Promise.resolve({
				status: "success",
				message: "Update todo successful",
				data: todoList[index]
			} as CreateTodoResponse)
		} else {
			return Promise.resolve({
				status: "error",
				message: "Update fail"
			} as CreateTodoResponse)
		}
	}

	async getTodos(): Promise<Todo[]> {
		const todoList = storageService.todoList
		return todoList || []
	}

	async deleteTodo(todoId: string): Promise<DeleteTodoResponse> {
		const todoList = storageService.todoList || []
		const index = todoList?.findIndex(todo => todo.id === todoId)

		if (index >= 0) {
			todoList?.splice(index, 1)
			storageService.todoList = todoList
			return Promise.resolve({
				status: "success",
				message: "Delele todo successful"
			} as DeleteTodoResponse)
		} else {
			return Promise.resolve({
				status: "error",
				message: "Delele fail"
			} as DeleteTodoResponse)
		}
	}
}

export default new ApiFrontend();