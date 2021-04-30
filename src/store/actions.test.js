import * as todoActions from './actions';

describe('Todo actions', () => {
  it('should return set todos type', () => {
    const expected = {
      type: todoActions.SET_TODO,
      payload: [{}],
    };
    expect(todoActions.setTodos([{}])).toEqual(expected);
  });

  it('should return create todos type', () => {
    const expected = {
      type: todoActions.CREATE_TODO,
      payload: {},
    };
    expect(todoActions.createTodo({})).toEqual(expected);
  });

  it('should return update todo status type', () => {
    const mock =  {
      todoId: 'abc',
      checked: true,
    }
    const expected = {
      type: todoActions.UPDATE_TODO_STATUS,
      payload: mock,
    };
    expect(todoActions.updateTodoStatus(mock.todoId, mock.checked)).toEqual(expected);
  });

  it('should return update todo item type', () => {
    const mock =  {
      todoId: 'abc',
      value: 'test',
    }
    const expected = {
      type: todoActions.UPDATE_TODO_ITEM,
      payload: mock,
    };
    expect(todoActions.updateTodoItem(mock.todoId, mock.value)).toEqual(expected);
  });

  it('should return delete todo item type', () => {
    const mock =  'abc';
    const expected = {
      type: todoActions.DELETE_TODO,
      payload: mock,
    };
    expect(todoActions.deleteTodo(mock)).toEqual(expected);
  });

  it('should return delete all todo type', () => {
    const expected = {
      type: todoActions.DELETE_ALL_TODOS,
    };
    expect(todoActions.deleteAllTodos()).toEqual(expected);
  });

  it('should return toggle all todos type', () => {
    const expected = {
      type: todoActions.TOGGLE_ALL_TODOS,
      payload: true,
    };
    expect(todoActions.toggleAllTodos(true)).toEqual(expected);
  });
});
