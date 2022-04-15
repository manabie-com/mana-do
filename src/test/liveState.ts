import { Todo, TodoStatus } from '../models/todo'

export const fakeTodo: Todo = {
  id: 'testId',
  content: 'Test content',
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  user_id: 'userId',
}

export const fakeTodoList: Todo[] = [
  fakeTodo,
  {
    id: 'testId2',
    content: 'Test content 2',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    user_id: 'userId',
  },
  {
    id: 'testId3',
    content: 'Test content 3',
    created_date: new Date().toISOString(),
    status: TodoStatus.COMPLETED,
    user_id: 'userId',
  },
]

export default {
  fakeTodo,
  fakeTodoList,
}
