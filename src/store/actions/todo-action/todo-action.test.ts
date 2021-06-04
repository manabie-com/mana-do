import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
  createTodo,
  deleteAllTodos,
  setTodos,
  deleteTodo,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus
} from './todo-action';
import {mockTodo1, mockTodo2} from "../../../utils/helpers/mockData/mockTodoData";
import {TodoStatus} from "../../../models/todo";

describe('todo-action must generate appropriate action values', () => {
  it('should create action to set todo list', () => {
    const action = setTodos([mockTodo1, mockTodo2]);

    expect(action).toEqual({
      type: SET_TODO,
      payload: [mockTodo1, mockTodo2]
    })
  });

  it('should create action to create new todo', () => {
    const action = createTodo(mockTodo1);

    expect(action).toEqual({
      type: CREATE_TODO,
      payload: mockTodo1
    })
  });

  it('should create action to update todo status', () => {
    const action = updateTodoStatus('1', TodoStatus.COMPLETED);

    expect(action).toEqual({
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: '1',
        status: TodoStatus.COMPLETED
      }
    });
  });

  it('should create action to update todo content', () => {
    const action = updateTodoContent('1', 'new content');

    expect(action).toEqual({
      type: UPDATE_TODO_CONTENT,
      payload: {
        todoId: '1',
        content: 'new content'
      }
    });
  });

  it('should create action to delete todo', () => {
    const action = deleteTodo('1');

    expect(action).toEqual({
      type: DELETE_TODO,
      payload: '1'
    });
  });

  it('should create action to delete all todos', () => {
    const action = deleteAllTodos();

    expect(action).toEqual({
      type: DELETE_ALL_TODOS
    });
  });

  it('should create action to toggle status all todos', () => {
    const action = toggleAllTodos(TodoStatus.COMPLETED);

    expect(action).toEqual({
      type: TOGGLE_ALL_TODOS,
      payload: TodoStatus.COMPLETED
    });
    const action2 = toggleAllTodos(TodoStatus.ACTIVE);

    expect(action2).toEqual({
      type: TOGGLE_ALL_TODOS,
      payload: TodoStatus.ACTIVE
    });
  });
});
