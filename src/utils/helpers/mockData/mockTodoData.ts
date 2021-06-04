import {Todo, TodoStatus} from '../../../models/todo';
const mockTodo1 : Todo = {
  id: '1',
  user_id: 'A',
  content: 'content 1',
  created_date: '04/06/2021',
  status: TodoStatus.COMPLETED
}
const mockTodo2 : Todo = {
  id: '2',
  user_id: 'A',
  content: 'content 2',
  created_date: '04/06/2021',
  status: TodoStatus.ACTIVE
}

export {mockTodo1, mockTodo2};
