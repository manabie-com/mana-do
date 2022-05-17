import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";
import { 
  getLocalStorageTodo,
  setLocalStorageTodo 
} from "../utils/localStorage";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
      try {
        const newTodo = {
          content,
          created_date: new Date().toISOString(),
          status: TodoStatus.ACTIVE,
          id: shortid(),
          user_id: "firstUser"
        };
  
        const currentTodo = getLocalStorageTodo();
        currentTodo.push(newTodo);
        setLocalStorageTodo(currentTodo);
  
        return Promise.resolve(
          newTodo
        );  
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    };
    async getTodos(): Promise<Todo[]> {
      const currentTodo = getLocalStorageTodo();
      return Promise.resolve(currentTodo);
    };
    async editTodo(id: string, newContent: string | boolean): Promise<boolean> {
      try {
        const currentTodo = getLocalStorageTodo();
        const todoEditPosition = currentTodo.findIndex((todo) => todo.id === id);
  
        if (todoEditPosition !== -1) {
          if (typeof newContent === "string"){
            currentTodo[todoEditPosition].content = newContent;
          } else {
            currentTodo[todoEditPosition].status = newContent ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
          }
        }
        setLocalStorageTodo(currentTodo);
        return Promise.resolve(true);
      } catch (error) {
        console.error(error);
        return Promise.reject(false);
      }
    };
}

export default new ApiFrontend();
