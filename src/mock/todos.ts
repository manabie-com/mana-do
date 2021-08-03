import { TodoStatus } from '../models/todo';

const todoList = [
  {
    id: '1',
    user_id: 'crissang',
    content : 'Todo 1',
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'crissang',
    content : 'Todo 2',
    status: TodoStatus.COMPLETED,
    created_date: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: 'crissang',
    content : 'Todo 3',
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  },
  {
    id: '4',
    user_id: 'crissang',
    content : 'Todo 4',
    status: TodoStatus.COMPLETED,
    created_date: new Date().toISOString(),
  },
  {
    id: '5',
    user_id: 'crissang',
    content : 'Todo 5',
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  },
];

export default todoList;