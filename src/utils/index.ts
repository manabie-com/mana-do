import { Todo, TodoStatus } from "../models/todo";

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export const turnCounter = (list: Array<Todo>, type: String) => {
  const getLength = onFilter(type, list);
  switch (type) {
    case TodoStatus.ALL:
      return list.length === 0 ? "" : list.length;
    case TodoStatus.ACTIVE:
    case TodoStatus.COMPLETED:
      return getLength.length === 0 ? "" : getLength.length;
    default:
      return "";
  }
};

export const btnList = [
  {
    name: TodoStatus.ALL,
    title: "All",
  },
  {
    name: TodoStatus.ACTIVE,
    title: "Active",
  },
  {
    name: TodoStatus.COMPLETED,
    title: "Completed",
  },
  {
    name: TodoStatus.CLEAR_ALL,
    title: "Clear all todos",
  },
];

export const onFilter = (filterType: String, todos: Array<Todo>) => {
  if (!todos?.length) return [];
  switch (filterType) {
    case TodoStatus.ACTIVE:
      const getActive = getStatus(TodoStatus.ACTIVE);
      return todos.filter(getActive);

    case TodoStatus.COMPLETED:
      const getComplete = getStatus(TodoStatus.COMPLETED);
      return todos.filter(getComplete);

    default:
      return todos;
  }
};

export const getStatus = (status: string) => (obj: any) =>
  obj.status === status;
