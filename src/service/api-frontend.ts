import shortid from 'shortid';
import { webStorage } from 'utils';

import { Todo, TodoStatus } from '../models/todo';
import { IAPI } from './types';

const TODOS_STORE_KEY = 'todos';

class ApiFrontend extends IAPI {
	async createTodo(content: string): Promise<Todo> {
		const newTodo = {
			content: content,
			created_date: new Date().toISOString(),
			status: TodoStatus.ACTIVE,
			id: shortid(),
			user_id: 'firstUser',
		} as Todo;
		const todos: Todo[] = webStorage.get(TODOS_STORE_KEY) || [];
		webStorage.set(TODOS_STORE_KEY, [ ...todos, newTodo ]);
		return Promise.resolve(newTodo);
	}

	async getTodos(): Promise<Todo[]> {
		const todos: Todo[] = webStorage.get(TODOS_STORE_KEY) || [];
		return Promise.resolve(todos);
	}

	async updateTodo(todoId: string, dataUpdate: { content?: string; status?: TodoStatus }): Promise<boolean> {
		const todos: Todo[] = webStorage.get(TODOS_STORE_KEY) || [];

		webStorage.set(TODOS_STORE_KEY, todos.map((item) => (item.id !== todoId ? item : { ...item, ...dataUpdate })));
		return Promise.resolve(true);
	}

	async deleteAllTodos(): Promise<boolean> {
		webStorage.set(TODOS_STORE_KEY, []);
		return Promise.resolve(true);
	}

	async deleteTodo(todoId: string): Promise<boolean> {
		const todos: Todo[] = webStorage.get(TODOS_STORE_KEY) || [];
		webStorage.set(TODOS_STORE_KEY, todos.filter((item) => item.id !== todoId));
		return Promise.resolve(true);
	}
}

export default new ApiFrontend();
