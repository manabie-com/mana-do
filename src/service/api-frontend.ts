import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
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

    // viet ham update status o day
    // truyen vo id
    async updateStatus(id: string, status: TodoStatus): Promise<boolean> {
            var todos = await this.getTodos()
            const index = todos.findIndex((t) => t.id === id)
            if (index === -1)return false;

            todos[index].status = status

            localStorage.setItem('state', JSON.stringify({
                todos : todos
            }))
            return true
    }

    async updateTodo(id: string, content: string): Promise<boolean> {
        var todos = await this.getTodos()
        const index = todos.findIndex((t) => t.id === id)
        if (index === -1)return false;

        todos[index].content = content

        localStorage.setItem('state', JSON.stringify({
            todos : todos
        }))
        return true
}

    async clearAllTodo(): Promise<boolean> {
        localStorage.clear()
        return true;
    }

    async clearTodo(id: string) : Promise<boolean> {
        var todos = await this.getTodos()
        const index = todos.findIndex((t) => t.id === id)
        if (index === -1)return false;
        todos.splice(index, 1);
        localStorage.setItem('state', JSON.stringify({
            todos : todos
        }))
        return true;
    }
    
}

export default new ApiFrontend();
