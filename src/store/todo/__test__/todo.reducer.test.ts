import reducer, { initialState } from '../reducer';
import { CREATE_TODO, CreateTodoAction } from '../actions';
import { ITodo, ETodoStatus } from '../../../types/todo';

describe('Add todo', () => {
  it('Shoult add success', () => {
    const newTodo: ITodo = {
      id: '1',
      content: 'Content',
      status: ETodoStatus.ACTIVE,
      created_date: new Date().toISOString(),
      user_id: 'firstUser'
    };
    const action: CreateTodoAction = {
      type: CREATE_TODO,
      payload: newTodo
    };
    const expectState = { ...initialState, todos: [ newTodo, ...initialState.todos ] };
    const updatedState = reducer(initialState, action);
    expect(updatedState).toEqual(expectState);
  });
});