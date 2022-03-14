import reducer, {initialState} from '../store/reducer';
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteTodo,
  deleteAllTodos,
  updateTodoStatus
} from '../store/actions';
import { Todo, TodoStatus } from '../models/todo';

describe('reducer', () => {
  const mockTodos: Array<Todo> = [
    {
      id: 'todo1',
      content: 'todo1',
      status: TodoStatus.ACTIVE,
    },
    {
      id: 'todo2',
      content: 'todo2',
      status: TodoStatus.ACTIVE,
    },
    {
      id: 'todo3',
      content: 'todo3',
      status: TodoStatus.COMPLETED,
    },
  ];
  const mockStateSingle = {
    todos: [ mockTodos[0] ],
  };
  const mockState = {
    todos: mockTodos,
  }

  it('should handle SetTodoAction', () => {
    expect(reducer(initialState, setTodos(mockTodos))).toEqual({
      todos: mockTodos,
    });
  });

  it('should handle CreateTodoAction', () => {
    expect(reducer(initialState, createTodo(mockTodos[0]))).toEqual({
      todos: [ mockTodos[0] ],
    });
  });

  it('should handle UpdateTodoStatusAction', () => {
    expect(reducer(mockStateSingle, updateTodoStatus(
      mockTodos[0].id,
      TodoStatus.COMPLETED,
    ))).toEqual({
      todos: [{
        ...mockTodos[0],
        status: TodoStatus.COMPLETED
      }],
    });
  });

  it('should handle DeleteTodoAction', () => {
    expect(reducer(mockState, deleteTodo(
      mockTodos[1].id,
    ))).toEqual({
      todos: [
        mockTodos[0],
        mockTodos[2],
      ],
    });
  });

  it('should handle DeleteAllTodosAction', () => {
    expect(reducer(mockState, deleteAllTodos())).toEqual(initialState);
  });

  it('should handle ToggleAllTodosAction', () => {
    expect(reducer(mockState, toggleAllTodos(TodoStatus.COMPLETED)))
      .toEqual({
        todos: mockTodos.map((todo) => ({
          ...todo,
          status: TodoStatus.COMPLETED,
        }))
      });
  });
});