import { TodoStatus } from '../../models/todo';

export const defaultToDos = [
  {
    content: 'Content',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: 'testId',
    user_id: 'firstUser',
  },
];

export const forTestingDeleteTodos = new Array(3).fill(defaultToDos[0]);
