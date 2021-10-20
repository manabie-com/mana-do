import { Constants } from "../constants";
import { EnhanceTodoStatus, Todo, TodoStatus } from "../models/todo";

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export const filterTodoWithStatus = (
  todo: Todo,
  showing: EnhanceTodoStatus
): boolean => {
  // switch (showing) {
  //   case TodoStatus.ACTIVE:
  //     return todo.status === TodoStatus.ACTIVE;
  //   case TodoStatus.COMPLETED:
  //     return todo.status === TodoStatus.COMPLETED;
  //   default:
  //     return true;
  // }

  // I think this way will be shorter
  return showing === todo.status || showing === Constants.ALL;
};
