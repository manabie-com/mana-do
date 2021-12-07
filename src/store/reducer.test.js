import reducer from './reducer'
import { CREATE_TODO, UPDATE_TODO_STATUS, UPDATE_TODO_CONTENT, TOGGLE_ALL_TODOS, DELETE_TODO, DELETE_ALL_TODOS } from './actions'

describe('Reducer function test', () => {
  test('Create new todo', () => {
    const initState = { todos: []}
  
    const action = {
      type: CREATE_TODO,
      payload: { content: "newTodo",
      created_date: "2021-12-06T15:57:42.254Z",
      id: "nWlS-cgwm",
      status: "ACTIVE",
      user_id: "firstUser" }
    };
  
    const updatedState = reducer(initState, action);
  
    expect(updatedState).toEqual({
      todos: [{
        content: "newTodo",
        created_date: "2021-12-06T15:57:42.254Z",
        id: "nWlS-cgwm",
        status: "ACTIVE",
        user_id: "firstUser"
      }]
    });
  })

  test('Update todo status', () => {
    const state = {
      todos: [
        {
          content: "todo 001",
          created_date: "2021-12-06T15:57:42.254Z",
          id: "nWlS-cgwm",
          status: "ACTIVE",
          user_id: "firstUser"
        },
        {
          content: "todo 002",
          created_date: "2021-12-06T15:57:41.554Z",
          id: "Yk23oxCsQ",
          status: "ACTIVE",
          user_id: "firstUser",
        }
      ]
    }
  
    const action = {
      type: UPDATE_TODO_STATUS,
      payload: { todoId: 'nWlS-cgwm', checked: true }
    };
  
    const updatedState = reducer(state, action);
  
    expect(updatedState).toEqual({
      todos: [
        {
          content: "todo 001",
          created_date: "2021-12-06T15:57:42.254Z",
          id: "nWlS-cgwm",
          status: "COMPLETED",
          user_id: "firstUser"
        },
        {
          content: "todo 002",
          created_date: "2021-12-06T15:57:41.554Z",
          id: "Yk23oxCsQ",
          status: "ACTIVE",
          user_id: "firstUser",
        }
      ]
    });
  })

  test('Update todo content', () => {
    const state = {
      todos: [
        {
          content: "todo 001",
          created_date: "2021-12-06T15:57:42.254Z",
          id: "nWlS-cgwm",
          status: "ACTIVE",
          user_id: "firstUser"
        },
        {
          content: "todo 002",
          created_date: "2021-12-06T15:57:41.554Z",
          id: "Yk23oxCsQ",
          status: "ACTIVE",
          user_id: "firstUser",
        }
      ]
    }
  
    const action = {
      type: UPDATE_TODO_CONTENT,
      payload: { todoId: 'nWlS-cgwm', newTodo: 'Change content' }
    };
  
    const updatedState = reducer(state, action);
  
    expect(updatedState).toEqual({
      todos: [
        {
          content: "Change content",
          created_date: "2021-12-06T15:57:42.254Z",
          id: "nWlS-cgwm",
          status: "ACTIVE",
          user_id: "firstUser"
        },
        {
          content: "todo 002",
          created_date: "2021-12-06T15:57:41.554Z",
          id: "Yk23oxCsQ",
          status: "ACTIVE",
          user_id: "firstUser",
        }
      ]
    });
  })

  test('Toggle all todos', () => {
    const state = {
      todos: [
        {
          content: "todo 001",
          created_date: "2021-12-06T15:57:42.254Z",
          id: "nWlS-cgwm",
          status: "ACTIVE",
          user_id: "firstUser"
        },
        {
          content: "todo 002",
          created_date: "2021-12-06T15:57:41.554Z",
          id: "Yk23oxCsQ",
          status: "ACTIVE",
          user_id: "firstUser",
        }
      ]
    }
  
    const action = {
      type: TOGGLE_ALL_TODOS,
      payload: true
    };
  
    const updatedState = reducer(state, action);
  
    expect(updatedState).toEqual({
      todos: [
        {
          content: "todo 001",
          created_date: "2021-12-06T15:57:42.254Z",
          id: "nWlS-cgwm",
          status: "COMPLETED",
          user_id: "firstUser"
        },
        {
          content: "todo 002",
          created_date: "2021-12-06T15:57:41.554Z",
          id: "Yk23oxCsQ",
          status: "COMPLETED",
          user_id: "firstUser",
        }
      ]
    });
  })

  test('Delete todo by ID', () => {
    const state = {
      todos: [
        {
          content: "todo 001",
          created_date: "2021-12-06T15:57:42.254Z",
          id: "nWlS-cgwm",
          status: "ACTIVE",
          user_id: "firstUser"
        },
        {
          content: "todo 002",
          created_date: "2021-12-06T15:57:41.554Z",
          id: "Yk23oxCsQ",
          status: "ACTIVE",
          user_id: "firstUser",
        }
      ]
    }
  
    const action = {
      type: DELETE_TODO,
      payload: "nWlS-cgwm"
    };
  
    const updatedState = reducer(state, action);
  
    expect(updatedState).toEqual({
      todos: [
        {
          content: "todo 002",
          created_date: "2021-12-06T15:57:41.554Z",
          id: "Yk23oxCsQ",
          status: "ACTIVE",
          user_id: "firstUser",
        }
      ]
    });
  })

  test('Delete all todos', () => {
    const state = {
      todos: [
        {
          content: "todo 001",
          created_date: "2021-12-06T15:57:42.254Z",
          id: "nWlS-cgwm",
          status: "ACTIVE",
          user_id: "firstUser"
        },
        {
          content: "todo 002",
          created_date: "2021-12-06T15:57:41.554Z",
          id: "Yk23oxCsQ",
          status: "ACTIVE",
          user_id: "firstUser",
        }
      ]
    }
  
    const action = {
      type: DELETE_ALL_TODOS
    };
  
    const updatedState = reducer(state, action);
  
    expect(updatedState).toEqual({
      todos: []
    });
  })
})