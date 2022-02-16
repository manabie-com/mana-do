import { Todo, TodoStatus } from '../models/todo';

export const itemFilteredByStauts = (
  data: Todo[],
  status: string,
) => {
  const filteredData = data.filter((todo: Todo) => {
    switch (status) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });
  return filteredData;
}
