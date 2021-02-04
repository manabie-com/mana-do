import * as selectors from '../selectors';
import { initialState } from '../slice';
import { TodoStatus } from 'models/todo';
import { RootState } from 'store/RootState';

describe('TodoPage selectors', () => {
  let state: RootState = { todoPage: initialState };

  beforeEach(() => {
    state = { todoPage: initialState };
  });

  it('should select filter', () => {
    const filter = 'ALL';
    state = {
      todoPage: { ...initialState, filter },
    };
    expect(selectors.selectFilter(state)).toEqual(filter);
  });

  it('should select visibleTodo', () => {
    const id = 'test';
    const todo = {
      id,
      user_id: 'test',
      content: 'test',
      created_date: 'date',
    };
    state = {
      todoPage: { ...initialState, ids: [id], entities: { [id]: todo } },
    };
    expect(selectors.selectVisibleTodo(state, id)).toEqual(todo);
  });

  it('should select visibleTodo return null', () => {
    const id = 'test';
    const todo = {
      id,
      user_id: 'test',
      content: 'test',
      created_date: 'date',
    };
    state = {
      todoPage: {
        ...initialState,
        filter: TodoStatus.COMPLETED,
        ids: [id],
        entities: { [id]: todo },
      },
    };
    expect(selectors.selectVisibleTodo(state, id)).toEqual(null);
  });
});
