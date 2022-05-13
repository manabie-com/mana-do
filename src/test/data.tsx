import { TodoStatus } from "models/todo";

export const createTodo = (id: string) => ({
	content: "content",
	created_date: "2022-05-12T10:09:29.657Z",
	status: TodoStatus.ACTIVE,
	id: id,
	user_id: "firstUser",
});
