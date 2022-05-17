import { IAPI }                         from "./types";
import { ITodoItem, TodoStatus }        from "../models/todo";
import shortid                          from "shortid";
class ApiFrontend extends IAPI {
    
    async createTodoItem(newTodo: any): Promise<ITodoItem> {

        const newTodoItem = Promise.resolve({
            content     : newTodo.content,
            created_date: newTodo.created_date,
            status      : TodoStatus.ACTIVE,
            id          : shortid(),
            user_id     : "firstUser",
        } as ITodoItem);
        
        return newTodoItem;
    }

    async ModifyTodoItem(modifyTodoItem: any): Promise<ITodoItem> {
        const newTodoItem = Promise.resolve({
            content     : modifyTodoItem.newContent,
            created_date: modifyTodoItem.newDate,
            status      : TodoStatus.ACTIVE,
            id          : modifyTodoItem.id,
            user_id     : "firstUser",
        } as ITodoItem);
        
        return newTodoItem;
    }

    async getTodoList(): Promise<ITodoItem[]> {
        const todoList = JSON.parse(localStorage.getItem("todoItem") || '[]');
        return todoList as ITodoItem[];
    }
    
}

export default new ApiFrontend();
