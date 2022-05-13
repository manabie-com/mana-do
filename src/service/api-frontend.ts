import { Todo, TodoStatus } from "models/todo";
import { IAPI } from "./types";
import LocalStore from "db/LocalStore";

class ApiFrontend extends IAPI {
	async createTodo(content: string): Promise<Todo> {
		return Promise.resolve(
			LocalStore.insert({
				content: content,
				created_date: new Date().toISOString(),
				status: TodoStatus.ACTIVE,
				id: "",
				user_id: "firstUser",
			}),
		);
	}

	async getTodos(): Promise<Todo[]> {
		return Promise.resolve(LocalStore.find());
	}

	async deleteTodo(id: string): Promise<boolean> {
		return Promise.resolve(LocalStore.delete(id));
	}

	async batchDelete(ids: string[]): Promise<boolean> {
		return Promise.resolve(LocalStore.batchDelete(ids));
	}

	async findById(id: string): Promise<Todo | null> {
		return Promise.resolve(LocalStore.findById(id));
	}

	async update(id: string, newData: Partial<Todo>): Promise<boolean> {
		return Promise.resolve(LocalStore.update(id, newData));
	}
}

export default new ApiFrontend();
