import {
  createTodo,
  deleteTodo,
  findTodoById,
  findTodoIndexById,
  updateTodoContent,
  updateTodoStatus
} from './todoUtils';
import {TodoStatus} from "../models/todo";

const todoId = 'ahsyel';

describe('todoUtils', () => {
  test('should create todo success', () => {
    const state = {
      todos: [
        {
          id: 'ahsyel',
          content: 'todo 1',
          user_id: 'firstUser',
          status: TodoStatus.Completed,
          created_date: ''
        }
      ]
    }
    const todoAdded = {
      id: 'ahsyel',
      content: 'todo 2',
      user_id: 'firstUser',
      status: TodoStatus.Completed,
      created_date: ''
    }
    const expectedData = {
      ...state,
      todos: [
        todoAdded,
        ...state.todos
      ]
    }
    // @ts-ignore
    const result = createTodo(state, todoAdded);
    expect(result).toEqual(expectedData);
  });

  test('should update todo status to Completed', () => {
    const state = {
      todos: [
        {
          id: todoId,
          content: 'todo 1',
          user_id: 'firstUser',
          status: TodoStatus.Active,
          created_date: ''
        }
      ]
    }
    const expectedData = {
      todos: [
        {
          ...state.todos[0],
          status: TodoStatus.Completed,
        }
      ]
    }
    // @ts-ignore
    const result = updateTodoStatus(state, todoId, true);
    expect(result).toEqual(expectedData);
  });

  test('should update todo status to Active', () => {
    const state = {
      todos: [
        {
          id: todoId,
          content: 'todo 1',
          user_id: 'firstUser',
          status: TodoStatus.Completed,
          created_date: ''
        }
      ]
    }
    const expectedData = {
      todos: [
        {
          ...state.todos[0],
          status: TodoStatus.Active,
        }
      ]
    }
    // @ts-ignore
    const result = updateTodoStatus(state, todoId, false);
    expect(result).toEqual(expectedData);
  });

  test('should update todo content success', () => {
    const content = 'todo content edited';
    const todos = [
      {
        id: todoId,
        content: 'todo 1',
        user_id: 'firstUser',
        status: TodoStatus.Completed,
        created_date: ''
      }
    ]

    const expectedData = [
      {
        ...todos[0],
        content: content,
      }
    ]
    // @ts-ignore
    const result = updateTodoContent(todos, todoId, content);
    expect(result).toEqual(expectedData);
  });

  test('should delete todo success', () => {
    const state = {
      todos: [
        {
          id: todoId,
          content: 'todo 1',
          user_id: 'firstUser',
          status: TodoStatus.Completed,
          created_date: ''
        },
        {
          id: 'ahsyel',
          content: 'todo 2',
          user_id: 'firstUser',
          status: TodoStatus.Completed,
          created_date: ''
        }
      ]
    }

    const expectedData = {
      todos: [
        {
          id: 'ahsyel',
          content: 'todo 2',
          user_id: 'firstUser',
          status: TodoStatus.Completed,
          created_date: ''
        }
      ]
    }
    // @ts-ignore
    const result = deleteTodo(state, todoId);
    expect(result).toEqual(expectedData);
  });

  test('should found todo by id', () => {
    const todos = [
      {
        id: todoId,
        content: 'todo 1',
        user_id: 'firstUser',
        status: TodoStatus.Completed,
        created_date: ''
      },
      {
        id: 'ahsyel',
        content: 'todo 2',
        user_id: 'firstUser',
        status: TodoStatus.Completed,
        created_date: ''
      }
    ]

    const expectedData = {
      id: todoId,
      content: 'todo 1',
      user_id: 'firstUser',
      status: TodoStatus.Completed,
      created_date: ''
    }
    // @ts-ignore
    const result = findTodoById(todos, todoId);
    expect(result).toEqual(expectedData);
  });

  test('should found todo index by id', () => {
    const todos = [
      {
        id: todoId,
        content: 'todo 1',
        user_id: 'firstUser',
        status: TodoStatus.Completed,
        created_date: ''
      },
      {
        id: 'ahsyel',
        content: 'todo 2',
        user_id: 'firstUser',
        status: TodoStatus.Completed,
        created_date: ''
      }
    ]
    // @ts-ignore
    const result = findTodoIndexById(todos, todoId);
    expect(result).toEqual(0);
  });
})
