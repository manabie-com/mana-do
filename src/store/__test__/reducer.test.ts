import {
  AppActions,
  setTodos,
  createTodo,
  updateTodoStatus,
  editTodo,
  toggleAllTodos,
  deleteAllTodos,
  deleteTodo,
} from 'store/actions';
import reducer, { AppState } from 'store/reducer';
import { Todo, TodoStatus } from 'models';
const mockTodo1: Todo = {
  id: 'huy123',
  content: 'some tasks',
  status: TodoStatus.ACTIVE,
  user_id: 'user1',
  created_date: new Date().toISOString(),
};
const mockTodo2: Todo = {
  id: 'huy456',
  content: 'some tasks',
  status: TodoStatus.COMPLETED,
  user_id: 'user1',
  created_date: new Date().toISOString(),
};
const state: AppState = {
  todos: [],
};
describe('Todo reducer', () => {
  it('should return empty array as inital state', () => {
    expect(reducer({ todos: [] }, {} as AppActions)).toEqual({ todos: [] });
  });
  it('should handle SET_TODO', () => {
    const action = setTodos([mockTodo1]);
    const newState = reducer(state, action);
    expect(newState).toEqual({
      todos: [mockTodo1],
    });
  });
  describe('Todo reducer with default state', () => {
    it('should handle CREATE_TODO', () => {
      const action = createTodo(mockTodo1);
      const newState = reducer(state, action);
      expect(newState).toEqual({
        todos: [mockTodo1],
      });
    });

    it('should handle UPDATE_TODO_STATUS', () => {
      const action = updateTodoStatus(mockTodo1.id, true);
      const anotherState: AppState = {
        todos: [...state.todos, mockTodo1],
      };
      const newState = reducer(anotherState, action);
      expect(newState).toEqual({
        todos: [{ ...mockTodo1, status: TodoStatus.COMPLETED }],
      });
    });
    it('should handle UPDATE_TODO_CONTENT', () => {
      const action = editTodo(mockTodo1.id, 'some tasks edited');
      const anotherState: AppState = {
        todos: [...state.todos, mockTodo1],
      };
      const newState = reducer(anotherState, action);
      expect(newState).toEqual({
        todos: [{ ...mockTodo1, content: 'some tasks edited' }],
      });
    });
    it('should handle TOGGLE_ALL_TODOS when the value is true', () => {
      const action = toggleAllTodos(true);
      const anotherState: AppState = {
        todos: [...state.todos, mockTodo1, mockTodo2],
      };
      const newState = reducer(anotherState, action);
      expect(newState.todos.filter((t) => t.status === TodoStatus.COMPLETED).length).toEqual(2);
      expect(newState.todos.filter((t) => t.status === TodoStatus.ACTIVE).length).toEqual(0);
    });
    it('should handle TOGGLE_ALL_TODOS when the value is false', () => {
      const action = toggleAllTodos(false);
      const anotherState: AppState = {
        todos: [...state.todos, mockTodo1, mockTodo2],
      };
      const newState = reducer(anotherState, action);
      expect(newState.todos.filter((t) => t.status === TodoStatus.ACTIVE).length).toEqual(2);
      expect(newState.todos.filter((t) => t.status === TodoStatus.COMPLETED).length).toEqual(0);
    });
    it('should handle DELETE_TODO', () => {
      const action = deleteTodo(mockTodo1.id);
      const anotherState: AppState = {
        todos: [...state.todos, mockTodo1, mockTodo2],
      };
      const newState = reducer(anotherState, action);
      expect(newState).toEqual({
        todos: [mockTodo2]
      });
    });
    it('should handle DELETE_ALL_TODOS', () => {
      const action = deleteAllTodos();
      const anotherState: AppState = {
        todos: [...state.todos, mockTodo1, mockTodo2],
      };
      const newState = reducer(anotherState, action);
      expect(newState).toEqual({
        todos: [],
      });
    });
  });
});