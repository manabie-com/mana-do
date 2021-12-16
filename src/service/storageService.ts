import { Todo } from "../models/todo";

export const allowedKeys = {
  TODO_LIST_KEY: 'todo_list',
};

class StorageService {

  get todoList () {
    const todos = localStorage.getItem(allowedKeys.TODO_LIST_KEY);
    if(todos) {
      return JSON.parse(todos)
    } else {
      return []
    }
  }

  set todoList (newValue: Todo[] | undefined) {
    if (typeof newValue === 'undefined') {
      localStorage.removeItem(allowedKeys.TODO_LIST_KEY);
      return;
    }
    localStorage.setItem(allowedKeys.TODO_LIST_KEY, JSON.stringify(newValue));
  }
}


export default new StorageService();
