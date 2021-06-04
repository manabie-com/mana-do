import todoReducer, {TodoState} from './todo-reducer';
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS
} from '../../actions/todo-action/todo-action';
import {TodoStatus} from '../../../models/todo';
import {mockTodo1, mockTodo2} from '../../../utils/helpers/mockData/mockTodoData';

describe('Todo reducer must work properly', () => {
  let initialTodoState : TodoState;

  beforeEach(() => {
    initialTodoState = {
      todos: []
    }
  });

  it('Must handle SET_TODO action', () => {
    const lastState = todoReducer(initialTodoState, {
      type: SET_TODO,
      payload: [mockTodo1, mockTodo2]
    });
    expect(lastState).toEqual({
      todos: [mockTodo1, mockTodo2]
    });
  });

  it('Must handle CREATE_TODO action', () => {
    const lastState = todoReducer(initialTodoState, {
      type: CREATE_TODO,
      payload: mockTodo1
    });
    expect(lastState).toEqual({
      todos: [mockTodo1]
    });

    // Even though we call reducer to dispatch twice,
    // (in case of React.StrictMode),
    // the return state must always be the same,
    // since the state call before dispatching are the same
    const lastState2 = todoReducer(initialTodoState, {
      type: CREATE_TODO,
      payload: mockTodo1
    });
    expect(lastState).toEqual(lastState2);
  });

  it('Must handle UPDATE_TODO_STATUS action', () => {
    const lastState = todoReducer({todos: [{...mockTodo1}]}, {
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: '1',
        status: TodoStatus.ACTIVE
      }
    });

    expect(lastState).toEqual({
      todos: [{
        ...mockTodo1,
        status: TodoStatus.ACTIVE
      }]
    });
  });

  it('Must handle UPDATE_TODO_CONTENT action', () => {
    const lastState = todoReducer({todos: [{...mockTodo1}]}, {
      type: UPDATE_TODO_CONTENT,
      payload: {
        todoId: '1',
        content: 'content A after edited'
      }
    });

    expect(lastState).toEqual({
      todos: [{
        ...mockTodo1,
        content: 'content A after edited'
      }]
    });
  });

  it('Must handle TOGGLE_ALL_TODOS action', () => {
    const lastState = todoReducer({todos: [{...mockTodo1}, {...mockTodo2}]}, {
      type: TOGGLE_ALL_TODOS,
      payload: TodoStatus.ACTIVE
    });

    expect(lastState).toEqual({
      todos: [{
        ...mockTodo1,
        status: TodoStatus.ACTIVE
      }, {
        ...mockTodo2,
        status: TodoStatus.ACTIVE
      }]
    });

    const lastState2 = todoReducer(lastState, {
      type: TOGGLE_ALL_TODOS,
      payload: TodoStatus.COMPLETED
    });

    expect(lastState2).toEqual({
      todos: [{
        ...mockTodo1,
        status: TodoStatus.COMPLETED
      }, {
        ...mockTodo2,
        status: TodoStatus.COMPLETED
      }]
    });
  });

  it('Must handle DELETE_TODO action', () => {
    const lastState = todoReducer({todos: [{...mockTodo1}, {...mockTodo2}]}, {
      type: DELETE_TODO,
      payload: '1'
    });
    expect(lastState).toEqual({
      todos: [{ ...mockTodo2 }]
    });
  });

  it('Must handle DELETE_ALL_TODOS action', () => {
    const lastState = todoReducer({todos: [{...mockTodo1}, {...mockTodo2}]}, {
      type: DELETE_ALL_TODOS
    });
    expect(lastState).toEqual({
      todos: []
    });
  });
});
