import { Todo } from "../../models/todo";

const TODO_STORAGE_KEY = "todo_list";

export type TodoStorage = {
  [todoId: string]: Todo;
};

export class TodoHelpers {
  public static getCurrentTodoLst(): TodoStorage {
    const cartObj = localStorage.getItem(TODO_STORAGE_KEY);
    if (!cartObj) {
      return {};
    }
    return JSON.parse(cartObj) as TodoStorage;
  }

  public static addOrUpdateTodo(todoId: string, item: Todo): TodoStorage {
    const currentItem = TodoHelpers.getCurrentTodoLst();

    if (currentItem[todoId]) {
      currentItem[todoId].id = todoId || currentItem[todoId].id;
      currentItem[todoId].content = item.content || currentItem[todoId].content;
      currentItem[todoId].status = item.status || currentItem[todoId].status;
      currentItem[todoId].user_id = item.user_id || currentItem[todoId].user_id;
    } else {
      currentItem[todoId] = item;
    }

    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(currentItem));

    return currentItem;
  }

  public static clearToDoList(): void {
    localStorage.removeItem(TODO_STORAGE_KEY);
  }

  public static removeTodo(todoId: string): TodoStorage {
    const currentItem = TodoHelpers.getCurrentTodoLst();
    if (currentItem[todoId]) {
      delete currentItem[todoId];
    }

    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(currentItem));

    return currentItem;
  }
}
