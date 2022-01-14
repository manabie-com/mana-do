import { TodoStatus } from "../constants/todo";
import Todo from "../models/todo"

export const filterTodoByStatus = (status: TodoStatus, todoList:  Array<Todo>) => {
  if (status === TodoStatus.ALL) {
    return todoList;
  } else {
    return todoList.filter((todo) => {
      return todo.status === status;
    });
  }
};


