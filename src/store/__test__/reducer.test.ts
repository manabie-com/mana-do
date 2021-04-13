import reducer, { initialState } from '../reducer';
import { TodoStatus } from '../../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
  SET_TODO
} from '../actions';

describe('test reducer', () => {
  test('create new todo when user type value and press enter', () => {
    const newTodo = {
      id: '1',
      user_id: 'xyz3tz',
      content: 'abc',
      created_date: '12/04/2021'
    };
    const action: AppActions = {
      type: CREATE_TODO,
      payload: { ...newTodo }
    };
    const results = reducer(initialState, action);
    expect(results).toEqual({
      todos: [newTodo]
    });
  });

  test('delete all todo when user click button clear all todos', () => {
    const action: AppActions = {
      type: DELETE_ALL_TODOS,
      payload: ''
    };
    const results = reducer(initialState, action);
    expect(results).toEqual({
      todos: []
    });
  });

  test('delete todo when user click button X', () => {
    const newTodo = [
      {
        id: '1',
        user_id: 'xyz3tz',
        content: 'abc',
        created_date: '12/04/2021'
      },
      {
        id: '2',
        user_id: 'xyz3tza',
        content: 'abc',
        created_date: '12/04/2021'
      }
    ];
    const action: AppActions = {
      type: DELETE_TODO,
      payload: '1'
    };
    const newState = {
      ...initialState,
      todos: newTodo
    };
    const results = reducer(newState, action);
    expect(results).toEqual({
      todos: [
        {
          id: '2',
          user_id: 'xyz3tza',
          content: 'abc',
          created_date: '12/04/2021'
        }
      ]
    });
  });

  test('toggle all todos show all status is completed when user checked checkbox', () => {
    const newTodo = [
      {
        id: '1',
        user_id: 'xyz3tz',
        content: 'abc',
        status: TodoStatus.ACTIVE,
        created_date: '12/04/2021'
      },
      {
        id: '2',
        user_id: 'xyz3tza',
        content: 'abc',
        status: TodoStatus.ACTIVE,
        created_date: '12/04/2021'
      }
    ];

    const newState = {
      ...initialState,
      todos: newTodo
    };
    const action: AppActions = {
      type: TOGGLE_ALL_TODOS,
      payload: true
    };
    const results = reducer(newState, action);
    expect(results).toEqual({
      todos: [
        {
          id: '1',
          user_id: 'xyz3tz',
          content: 'abc',
          status: TodoStatus.COMPLETED,
          created_date: '12/04/2021'
        },
        {
          id: '2',
          user_id: 'xyz3tza',
          content: 'abc',
          status: TodoStatus.COMPLETED,
          created_date: '12/04/2021'
        }
      ]
    });
  });

  test('toggle all todos show all status is completed when user unchecked checkbox', () => {
    const newTodo = [
      {
        id: '1',
        user_id: 'xyz3tz',
        content: 'abc',
        status: TodoStatus.COMPLETED,
        created_date: '12/04/2021'
      },
      {
        id: '2',
        user_id: 'xyz3tza',
        content: 'abc',
        status: TodoStatus.COMPLETED,
        created_date: '12/04/2021'
      }
    ];

    const newState = {
      ...initialState,
      todos: newTodo
    };
    const action: AppActions = {
      type: TOGGLE_ALL_TODOS,
      payload: false
    };
    const results = reducer(newState, action);
    expect(results).toEqual({
      todos: [
        {
          id: '1',
          user_id: 'xyz3tz',
          content: 'abc',
          status: TodoStatus.ACTIVE,
          created_date: '12/04/2021'
        },
        {
          id: '2',
          user_id: 'xyz3tza',
          content: 'abc',
          status: TodoStatus.ACTIVE,
          created_date: '12/04/2021'
        }
      ]
    });
  });

  test('Update status to do when user checked checkbox', () => {
    const newTodo = [
      {
        id: '1',
        user_id: 'xyz3tz',
        content: 'abc',
        status: TodoStatus.ACTIVE,
        created_date: '12/04/2021'
      },
      {
        id: '2',
        user_id: 'xyz3tza',
        content: 'abc',
        status: TodoStatus.COMPLETED,
        created_date: '12/04/2021'
      }
    ];
    const newState = {
      ...initialState,
      todos: newTodo
    };
    const action: AppActions = {
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: '1',
        checked: true
      }
    };
    const results = reducer(newState, action);
    expect(results.todos[0]).toEqual({
      id: '1',
      user_id: 'xyz3tz',
      content: 'abc',
      status: TodoStatus.COMPLETED,
      created_date: '12/04/2021'
    });
  });
  test('Update status to do when user unchecked checkbox', () => {
    const newTodo = [
      {
        id: '1',
        user_id: 'xyz3tz',
        content: 'abc',
        status: TodoStatus.COMPLETED,
        created_date: '12/04/2021'
      },
      {
        id: '2',
        user_id: 'xyz3tza',
        content: 'abc',
        status: TodoStatus.COMPLETED,
        created_date: '12/04/2021'
      }
    ];
    const newState = {
      ...initialState,
      todos: newTodo
    };
    const action: AppActions = {
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: '1',
        checked: false
      }
    };
    const results = reducer(newState, action);
    expect(results.todos[0]).toEqual({
      id: '1',
      user_id: 'xyz3tz',
      content: 'abc',
      status: TodoStatus.ACTIVE,
      created_date: '12/04/2021'
    });
  });
  test('Update to do when user edit', () => {
    const newTodo = [
        {
          id: '1',
          user_id: 'xyz3tz',
          content: 'abc',
          status: TodoStatus.COMPLETED,
          created_date: '12/04/2021'
        },
        {
          id: '2',
          user_id: 'xyz3tza',
          content: 'abc',
          status: TodoStatus.COMPLETED,
          created_date: '12/04/2021'
        }
      ];
  
      const newState = {
        ...initialState,
        todos: newTodo
      };
      const action: AppActions = {
        type: UPDATE_TODO,
        payload: {
            content: 'bcd',
            todoId: '1'
        }
      };
      const results = reducer(newState, action);
      expect(results.todos[0].content).toEqual('bcd')
  })
  test('Set do do', () => {
    const newTodo = [
        {
          id: '1',
          user_id: 'xyz3tz',
          content: 'abc',
          status: TodoStatus.COMPLETED,
          created_date: '12/04/2021'
        },
        {
          id: '2',
          user_id: 'xyz3tza',
          content: 'abc',
          status: TodoStatus.COMPLETED,
          created_date: '12/04/2021'
        }
      ];
      const action: AppActions = {
        type: SET_TODO,
        payload: newTodo
      };
      const results = reducer(initialState, action); 
      expect(results.todos).toEqual(newTodo)
  })
});
 