import { TodoStatus } from 'models/todo';
import * as slice from '../slice';
import { ContainerState } from '../types';

describe('TodoPage slice', () => {
  let state: ContainerState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle completeAllTodos', () => {
    const todo = {
      id: 'test',
      status: TodoStatus.ACTIVE,
      user_id: 'test',
      content: '',
      created_date: 'date',
    };
    state = {
      filter: 'test',
      ids: ['test'],
      entities: {
        test: todo,
      },
    };
    expect(
      slice.reducer(state, slice.actions.completeAllTodos),
    ).toEqual<ContainerState>({
      ...state,
      entities: {
        test: { ...todo, status: TodoStatus.COMPLETED },
      },
    });
  });

  it('should handle setFilter', () => {
    const filter = TodoStatus.COMPLETED;
    expect(
      slice.reducer(state, slice.actions.setFilter(filter)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      filter,
    });
  });
});
