import {Dispatch} from "react";
import service from '../../service';
import TodoActionsCreator, {ACTION_TYPES, ITodoActions} from './TodoActions';
import {
  handleAddTodo,
  handleFetchTodos,
  handleRearrangeTodos,
  handleRemoveAllTodos,
  handleRemoveTodo, handleUpdateAllTodosStatus,
  handleUpdateTodo,
} from './TodoSideEffects';
import {Todo, TodoStatus} from "../../models/todo";

jest.mock('../../service');

describe('Test Todo Side Effects', () => {
  it('Should call dispatch with correct data when fetch todos succeed', async () => {
    const getTodosSpy = jest.spyOn(service, 'getTodos');
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
    getTodosSpy.mockResolvedValue(mockTodos);
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleFetchTodos(dispatch);
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.FETCH_TODOS_SUCCESS,
      todos: mockTodos,
    })
  })
  it('Should call dispatch with correct data when fetch todos failed', async () => {
    const getTodosSpy = jest.spyOn(service, 'getTodos');
    getTodosSpy.mockRejectedValue({message: 'mock-message'});
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleFetchTodos(dispatch);
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.FETCH_TODOS_FAIL,
      errorMessage: 'mock-message',
    })
  })

  it('Should call dispatch with correct data when add todo succeed', async () => {
    const createTodoSpy = jest.spyOn(service, 'createTodo');
    const mockTodo: Todo = {
      status: TodoStatus.COMPLETED,
      id: 'mock-id',
      user_id: 'mock-user-id',
      content: 'mock-content',
      created_date: 'mock-created-date'
    };
    createTodoSpy.mockResolvedValue(mockTodo);
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleAddTodo(dispatch, TodoActionsCreator.addTodo('mock-content'));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.ADD_TODO_SUCCESS,
      todo: mockTodo,
    })
  })
  it('Should call dispatch with correct data when add todo failed', async () => {
    const createTodoSpy = jest.spyOn(service, 'createTodo');
    createTodoSpy.mockRejectedValue({message: 'mock-error-message'});
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleAddTodo(dispatch, TodoActionsCreator.addTodo('mock-content'));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.ADD_TODO_FAIL,
      errorMessage: 'mock-error-message',
    })
  })

  it('Should call dispatch with correct data when update todo succeed', async () => {
    const updateTodoSpy = jest.spyOn(service, 'updateTodo');
    const mockUpdatedTodo: Todo = {
      status: TodoStatus.COMPLETED,
      id: 'mock-id-1',
      user_id: 'mock-user-id',
      content: 'mock-content',
      created_date: 'mock-created-date'
    };
    updateTodoSpy.mockResolvedValue(mockUpdatedTodo);
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleUpdateTodo(dispatch, TodoActionsCreator.updateTodo('mock-id-1', {
      content: 'mock-content',
      status: TodoStatus.COMPLETED,
    }));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.UPDATE_TODO_SUCCESS,
      todo: mockUpdatedTodo,
    })
  })
  it('Should call dispatch with correct data when update todo failed', async () => {
    const updateTodoSpy = jest.spyOn(service, 'updateTodo');
    updateTodoSpy.mockRejectedValue({message: 'mock-error-message'});
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleUpdateTodo(dispatch, TodoActionsCreator.updateTodo('mock-id-1', {
      content: 'mock-content',
      status: TodoStatus.COMPLETED,
    }));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.UPDATE_TODO_FAIL,
      errorMessage: 'mock-error-message',
    })
  })

  it('Should call dispatch with correct data when remove todo succeed', async () => {
    const removeTodoSpy = jest.spyOn(service, 'removeTodo');
    removeTodoSpy.mockResolvedValue('mock-id-1');
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleRemoveTodo(dispatch, TodoActionsCreator.removeTodo('mock-id-1'));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.REMOVE_TODO_SUCCESS,
      id: 'mock-id-1',
    })
  })
  it('Should call dispatch with correct data when remove todo failed', async () => {
    const removeTodoSpy = jest.spyOn(service, 'removeTodo');
    removeTodoSpy.mockRejectedValue({message: 'mock-error-message'});
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleRemoveTodo(dispatch, TodoActionsCreator.removeTodo('mock-id-1'));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.REMOVE_TODO_FAIL,
      errorMessage: 'mock-error-message',
    })
  })

  it('Should call dispatch with correct data when rearrange todos succeed', async () => {
    const updateTodosSpy = jest.spyOn(service, 'updateTodos');
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
    updateTodosSpy.mockResolvedValue(mockTodos);
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleRearrangeTodos(dispatch, TodoActionsCreator.rearrangeTodo(mockTodos));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.REARRANGE_TODOS_SUCCESS,
      todos: mockTodos,
    })
  })
  it('Should call dispatch with correct data when rearrange todos failed', async () => {
    const updateTodosSpy = jest.spyOn(service, 'updateTodos');
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
    updateTodosSpy.mockRejectedValue({message: 'mock-message'});
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleRearrangeTodos(dispatch, TodoActionsCreator.rearrangeTodo(mockTodos));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.REARRANGE_TODOS_FAIL,
      errorMessage: 'mock-message',
    })
  })

  it('Should call dispatch with correct data when remove all todos succeed', async () => {
    const updateTodosSpy = jest.spyOn(service, 'updateTodos');
    updateTodosSpy.mockResolvedValue([]);
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleRemoveAllTodos(dispatch);
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.REMOVE_ALL_TODOS_SUCCESS
    })
  })
  it('Should call dispatch with correct data when remove all todos failed', async () => {
    const updateTodosSpy = jest.spyOn(service, 'updateTodos');
    updateTodosSpy.mockRejectedValue({message: 'error-message-1'});
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleRemoveAllTodos(dispatch);
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.REMOVE_ALL_TODOS_FAIL,
      errorMessage: 'error-message-1',
    })
  })

  it('Should call dispatch with correct data when update all todos status succeed', async () => {
    const updateTodosSpy = jest.spyOn(service, 'updateTodos');
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
    const mockUpdatedTodos: Todo[] = [
      {
        status: TodoStatus.ACTIVE,
        id: 'mock-id',
        user_id: 'mock-user-id',
        content: 'mock-content',
        created_date: 'mock-created-date'
      },
      {
        status: TodoStatus.ACTIVE,
        id: 'mock-id-1',
        user_id: 'mock-user-id-2',
        content: 'mock-content-1',
        created_date: 'mock-created-date-1'
      }];
    updateTodosSpy.mockResolvedValue(mockUpdatedTodos);
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleUpdateAllTodosStatus(dispatch, TodoActionsCreator.updateAllTodosStatus(TodoStatus.ACTIVE, mockTodos));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.UPDATE_ALL_TODOS_STATUS_SUCCESS,
      todos: mockUpdatedTodos,
    })
  })

  it('Should call dispatch with correct data when update all todos status failed', async () => {
    const updateTodosSpy = jest.spyOn(service, 'updateTodos');
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
    updateTodosSpy.mockRejectedValue({message: 'message-1'});
    const dispatch = jest.fn() as Dispatch<ITodoActions>;
    await handleUpdateAllTodosStatus(dispatch, TodoActionsCreator.updateAllTodosStatus(TodoStatus.ACTIVE, mockTodos));
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.UPDATE_ALL_TODOS_STATUS_FAIL,
      errorMessage: 'message-1',
    })
  })
});