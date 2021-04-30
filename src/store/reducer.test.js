
import reducer, { initialState } from './reducer';
import * as todoActions from './actions';

describe('todos reducer', () => {
  const todosMock = [{}, {}, {}];
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(reducer({}, undefined)).toEqual(state);
  });

  it('should handle create todos', () => {
    expect(reducer(initialState, todoActions.createTodo({}))).toEqual({
      ...initialState,
      todos: [{}],
    });
  });

  it('should kepp todos when todoId undefined', () => {
    expect(reducer(initialState, todoActions.updateTodoStatus())).toEqual({
      ...initialState,
      todos: [],
    });
  });

  it('should handle set todos', () => {
    expect(reducer(initialState, todoActions.setTodos(todosMock))).toEqual({
      ...initialState,
      todos: todosMock,
    });
  });

  it('should handle delete todos', () => {
    expect(reducer(initialState, todoActions.deleteTodo())).toEqual({
      ...initialState,
      todos: [],
    });
  });
});