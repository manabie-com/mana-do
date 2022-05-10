import { Todo, TodoStatus } from '../../../models/todo';
const created_date = new Date().toISOString();
export const defaultToDos = {
  content: 'Content',
  created_date,
  status: TodoStatus.ACTIVE,
  id: 'testId',
  user_id: 'firstUser',
} as Todo;

export function spawnToDos(count: number): Todo[] {
  return new Array(count).fill(defaultToDos).map(todo => {
    todo.id = `testId-${Math.random()}`;
    return todo;
  });
}
