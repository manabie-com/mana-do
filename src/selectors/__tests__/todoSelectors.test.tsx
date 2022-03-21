import { TodoStatus } from '../../constants/todo';
import Todo from '../../models/todo';
import { filterTodoByStatus, sumTodoActive } from '../todo';

const todoActive = new Todo(
  '1',
  'newUser',
  'New todo 1',
  new Date().toUTCString(),
  TodoStatus.ACTIVE
);

const todoComplete = new Todo(
  '3',
  'newUser',
  'Completed todo',
  new Date().toUTCString(),
  TodoStatus.COMPLETED
);

const todoListAll = [todoActive, todoActive, todoComplete, todoComplete];
const todoListComplete = [todoComplete, todoComplete];
const todoListActive = [todoActive, todoActive];

const testTodoListFilterProviders = [
  [
    {
      description: 'Will return all to do list if status is all',
      status: TodoStatus.ALL,
      todoList: todoListAll,
      result: todoListAll,
    },
  ],
  [
    {
      description: 'Will return all to do list complete if status is complete',
      status: TodoStatus.COMPLETED,
      todoList: todoListAll,
      result: todoListComplete,
    },
  ],
  [
    {
      description: 'Will return all to do list if status is active',
      status: TodoStatus.ACTIVE,
      todoList: todoListAll,
      result: todoListActive,
    },
  ],
  [
    {
      description: 'Will return empty if todo list is empty',
      status: TodoStatus.ALL,
      todoList: [],
      result: [],
    },
  ],
];

describe.each(testTodoListFilterProviders)(
  'Test Todo list filter',
  ({ description, status, todoList, result }) => {
    it(description, () => {
      expect(filterTodoByStatus(status, todoList)).toEqual(result);
    });
  }
);

const testSumTodoListActive = [
  [
    {
      description: 'Will return 2 if status active is 2',
      todoList: todoListAll,
      result: 2,
    },
  ],
  [
    {
      description: 'Will return 0 if status active is 0',
      todoList: todoListComplete,
      result: 0,
    },
  ],
  [
    {
      description: 'Will return 2 if status active is 2',
      todoList: todoListActive,
      result: todoListActive.length,
    },
  ],
];

describe.each(testSumTodoListActive)(
  'Test sum todo list complete',
  ({ description, todoList, result }) => {
    it(description, () => {
      expect(sumTodoActive(todoList)).toEqual(result);
    });
  }
);
