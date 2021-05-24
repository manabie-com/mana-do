import {todoReducer} from './TodoReducer';
import TodoActionsCreator from './TodoActions';
import {Todo, TodoStatus} from '../../models/todo';

describe('Test Todo Reducer', () => {
  test('Should return correct state when fetching todos', () => {
    const state = todoReducer(undefined, TodoActionsCreator.fetchTodos());
    expect(state.loading).toEqual(true);
  })
  test('Should return correct state when fetch todos succeed', () => {
    const mockTodos: Todo[] = [{
      status: TodoStatus.COMPLETED,
      id: 'mock-id',
      user_id: 'mock-user-id',
      content: 'mock-content',
      created_date: 'mock-created-date'
    }];
    const state = todoReducer(undefined, TodoActionsCreator.fetchTodosSucceed(mockTodos));
    expect(state.loading).toEqual(false);
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].content).toEqual('mock-content');
  })

  test('Should return correct state when fetch todos failed', () => {
    const state = todoReducer(undefined, TodoActionsCreator.fetchTodosFailed('mock-message'));
    expect(state.loading).toEqual(false);
    expect(state.todos).toHaveLength(0);
  })
  test('Should return correct state when adding todo', () => {
    const state = todoReducer(undefined, TodoActionsCreator.addTodo('mock-todo'));
    expect(state.loading).toEqual(true);
  })
  test('Should return correct state when add todo succeed', () => {
    const mockTodos: Todo[] = [{
      status: TodoStatus.COMPLETED,
      id: 'mock-id',
      user_id: 'mock-user-id',
      content: 'mock-content',
      created_date: 'mock-created-date'
    }];
    const mockTodo = {
      status: TodoStatus.ACTIVE,
      id: 'mock-id-1',
      user_id: 'mock-user-id-1',
      content: 'mock-content-1',
      created_date: 'mock-created-date-1'
    };
    const mockCurrentState = {
      todos: mockTodos,
      loading: false,
      errorMessage: null,
    }
    const state = todoReducer(mockCurrentState, TodoActionsCreator.addTodoSucceed(mockTodo));
    expect(state.loading).toEqual(false);
    expect(state.todos).toHaveLength(2);
    expect(state.todos[0]).toEqual(mockTodo);
  })
  test('Should return correct state when add todo failed', () => {
    const state = todoReducer(undefined, TodoActionsCreator.addTodoFailed('mock-message'));
    expect(state.loading).toEqual(false);
  })

  test('Should return correct state when updating todo', () => {
    const state = todoReducer(undefined, TodoActionsCreator.updateTodo('mock-id', {}));
    expect(state.loading).toEqual(true);
  })
  test('Should return correct state when update todo succeed', () => {
    const mockTodos: Todo[] = [
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id',
        user_id: 'mock-user-id',
        content: 'mock-content',
        created_date: 'mock-created-date'
      },
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id-1',
        user_id: 'mock-user-id-2',
        content: 'mock-content-1',
        created_date: 'mock-created-date-1'
      }];

    const mockUpdatedTodo = {
      status: TodoStatus.ACTIVE,
      id: 'mock-id-1',
      user_id: 'mock-user-id-2',
      content: 'updated-content',
      created_date: 'mock-created-date-1'
    }

    const mockCurrentState = {
      todos: mockTodos,
      loading: false,
      errorMessage: null,
    }
    const state = todoReducer(mockCurrentState, TodoActionsCreator.updateTodoSucceed(mockUpdatedTodo));
    expect(state.loading).toEqual(false);
    expect(state.todos).toHaveLength(2);
    expect(state.todos[1]).toEqual(mockUpdatedTodo);
  })
  test('Should return correct state when update todo failed', () => {
    const state = todoReducer(undefined, TodoActionsCreator.updateTodoFailed('mock-message'));
    expect(state.loading).toEqual(false);
  })

  test('Should return correct state when removing todo', () => {
    const state = todoReducer(undefined, TodoActionsCreator.removeTodo('mock-id'));
    expect(state.loading).toEqual(true);
  })
  test('Should return correct state when remove todo succeed', () => {
    const mockTodos: Todo[] = [
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id',
        user_id: 'mock-user-id',
        content: 'mock-content',
        created_date: 'mock-created-date'
      },
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id-1',
        user_id: 'mock-user-id-2',
        content: 'mock-content-1',
        created_date: 'mock-created-date-1'
      }];

    const mockCurrentState = {
      todos: mockTodos,
      loading: false,
      errorMessage: null,
    }
    const state = todoReducer(mockCurrentState, TodoActionsCreator.removeTodoSucceed('mock-id-1'));
    expect(state.loading).toEqual(false);
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].id).toEqual('mock-id');
  })
  test('Should return correct state when remove todo failed', () => {
    const state = todoReducer(undefined, TodoActionsCreator.removeTodoFailed('mock-message'));
    expect(state.loading).toEqual(false);
  })

  test('Should return correct state when rearranging todos', () => {
    const mockTodos: Todo[] = [
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id',
        user_id: 'mock-user-id',
        content: 'mock-content',
        created_date: 'mock-created-date'
      }
    ];
    const state = todoReducer(undefined, TodoActionsCreator.rearrangeTodo(mockTodos));
    expect(state.loading).toEqual(true);
  })

  test('Should return correct state when rearrange todos succeed', () => {
    const mockUpdatedTodos: Todo[] = [
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id-1',
        user_id: 'mock-user-id-2',
        content: 'mock-content-1',
        created_date: 'mock-created-date-1'
      },
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id',
        user_id: 'mock-user-id',
        content: 'mock-content',
        created_date: 'mock-created-date'
      }
    ];

    const state = todoReducer(undefined, TodoActionsCreator.rearrangeTodoSucceed(mockUpdatedTodos));
    expect(state.loading).toEqual(false);
    expect(state.todos).toHaveLength(2);
    expect(state.todos[0].id).toEqual('mock-id-1');
    expect(state.todos[1].id).toEqual('mock-id');
  })
  test('Should return correct state when rearrange todo failed', () => {
    const state = todoReducer(undefined, TodoActionsCreator.rearrangeTodoFailed('mock-message'));
    expect(state.loading).toEqual(false);
  })

  test('Should return correct state when removing all todos', () => {
    const state = todoReducer(undefined, TodoActionsCreator.removeAllTodos());
    expect(state.loading).toEqual(true);
  })
  test('Should return correct state when removing all todos succeed', () => {
    const mockTodos: Todo[] = [
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id',
        user_id: 'mock-user-id',
        content: 'mock-content',
        created_date: 'mock-created-date'
      }
    ];
    const mockCurrentState = {
      todos: mockTodos,
      loading: false,
      errorMessage: null,
    }
    const state = todoReducer(mockCurrentState, TodoActionsCreator.removeAllTodosSucceed());
    expect(state.loading).toEqual(false);
    expect(state.todos).toHaveLength(0);
  })
  test('Should return correct state when remove all todos failed', () => {
    const state = todoReducer(undefined, TodoActionsCreator.rearrangeTodoFailed('mock-message'));
    expect(state.loading).toEqual(false);
  })

  test('Should return correct state when updating all todos status', () => {
    const mockTodos: Todo[] = [
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id',
        user_id: 'mock-user-id',
        content: 'mock-content',
        created_date: 'mock-created-date'
      }
    ];
    const state = todoReducer(undefined, TodoActionsCreator.updateAllTodosStatus(TodoStatus.ACTIVE, mockTodos));
    expect(state.loading).toEqual(true);
  })

  test('Should return correct state when update all todos succeed', () => {
    const mockUpdatedTodos: Todo[] = [
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id',
        user_id: 'mock-user-id',
        content: 'mock-content',
        created_date: 'mock-created-date'
      },
      {
        status: TodoStatus.COMPLETED,
        id: 'mock-id-1',
        user_id: 'mock-user-id-2',
        content: 'mock-content-1',
        created_date: 'mock-created-date-1'
      }
    ];

    const state = todoReducer(undefined, TodoActionsCreator.updateAllTodosStatusSucceed(mockUpdatedTodos));
    expect(state.loading).toEqual(false);
    expect(state.todos).toHaveLength(2);
    expect(state.todos[0].id).toEqual('mock-id');
    expect(state.todos[1].id).toEqual('mock-id-1');
  })
  test('Should return correct state when update all todos status', () => {
    const state = todoReducer(undefined, TodoActionsCreator.updateAllTodosStatusFailed('mock-message'));
    expect(state.loading).toEqual(false);
  })
})