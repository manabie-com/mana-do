import { CreateTodoDto, DeleteTodoDto, Todo, TodoStatus, ToggleAllTodosDto, UpdateTodoDto } from "app/todo/todo.models";
import shortid from "shortid";
import { IAPI } from "./types";

class ApiFrontend extends IAPI {
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todos = await this.getTodos();

    const todo = {
      content: createTodoDto.content,
      updated_date: new Date().toISOString(),
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "hh1296",
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    return Promise.resolve(todo);
  }

  async getTodos(): Promise<Todo[]> {
    return Promise.resolve(JSON.parse(localStorage.getItem("todos") || "[]"));
  }

  async updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { id, ...updateTodoPayload } = updateTodoDto;

    const todos = await this.getTodos();

    const index = todos.findIndex((_todo) => _todo.id === id);

    if (index === -1) {
      throw new Error("Todo not found");
    }

    const updatedTodo = { ...todos[index], ...updateTodoPayload, updated_date: new Date().toISOString() };

    todos[index] = updatedTodo;

    localStorage.setItem("todos", JSON.stringify(todos));

    return Promise.resolve(updatedTodo);
  }

  async toggleAllTodos(toggleAllTodosDto: ToggleAllTodosDto): Promise<Todo[]> {
    const todos = await this.getTodos();

    todos.forEach((todo) => {
      todo.status = toggleAllTodosDto.status;
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    return Promise.resolve(todos);
  }

  async deleteTodo(deleteTodoDto: DeleteTodoDto): Promise<string> {
    const todos = await this.getTodos();

    const index = todos.findIndex((_todo) => _todo.id === deleteTodoDto.id);

    if (index === -1) {
      throw new Error("Todo not found");
    }

    todos.splice(index, 1);

    localStorage.setItem("todos", JSON.stringify(todos));

    return Promise.resolve(deleteTodoDto.id);
  }

  async deleteAllTodos() {
    localStorage.setItem("todos", JSON.stringify([]));
  }
}

export default new ApiFrontend();
