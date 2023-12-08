import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        console.log('error')
        var todo = {
                    content: content,
                    created_date: new Date().toISOString(),
                    status: TodoStatus.ACTIVE,
                    id: shortid(),
                    user_id: "firstUser",
                } as Todo;
        // goi ham getTodos gan vao bien todos
      var todos = await this.getTodos()
      // day object Todo vao todos
      todos.push(todo)
                // luu vao storage voi key state chuoi json cua todos
        localStorage.setItem('state', JSON.stringify({
            todos : todos
        }))
        return Promise.resolve(todo);
    }

    async getTodos(): Promise<Todo[]> {
        var state = JSON.parse(localStorage.getItem('state') || '{"todos": []}') ;
       return state.todos;
    }
}

export default new ApiFrontend();
