import { CREATE_TODO, EDIT_TODO, TOGGLE_ALL_TODOS, UPDATE_TODO_STATUS, DELETE_TODO, DELETE_ALL_TODOS, SET_TODO } from '../actions'
import { TodoStatus } from '../../models/todo'
import reducer from '../reducer'

test('Create Todo', () => {
  const state = {
    todos: []
  }

  const resp = reducer(state, {
    type: CREATE_TODO,
    payload: {
      id: 'testid',
      user_id: 'userid',
      content: 'content',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    }
  })

  expect(resp).toEqual({
    todos: [{
      id: 'testid',
      user_id: 'userid',
      content: 'content',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    }]
  })
})

test('Edit Todo', () => {
  const state = {
    todos: [{
      id: 'testid',
      user_id: 'userid',
      content: 'oldcontent',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    }]
  }

  const resp = reducer(state, {
    type: EDIT_TODO,
    payload: {
      id: 'testid',
      user_id: 'userid',
      content: 'newcontent',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    }
  })

  expect(resp).toEqual({
    todos: [{
      id: 'testid',
      user_id: 'userid',
      content: 'newcontent',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    }]
  })
})

test('Update Todo Status', () => {
  const state = {
    todos: [{
      id: 'testid',
      user_id: 'userid',
      content: 'content',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    }]
  }

  const resp = reducer(state, {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId: 'testid',
      checked: true
    }
  })

  expect(resp).toEqual({
    todos: [{
      id: 'testid',
      user_id: 'userid',
      content: 'content',
      status: TodoStatus.COMPLETED,
      created_date: 'date'
    }]
  })
})

test('Toggle all todos completed', () => {
  const state = {
    todos: [
    {
      id: 'testid',
      user_id: 'userid',
      content: 'content',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    },
    {
      id: 'testid2',
      user_id: 'userid2',
      content: 'content2',
      status: TodoStatus.COMPLETED,
      created_date: 'date'
    },
    {
      id: 'testid3',
      user_id: 'userid3',
      content: 'content3',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    }
  ]
  }

  const resp = reducer(state, {
    type: TOGGLE_ALL_TODOS,
    payload: true
  })

  expect(resp).toEqual({
    todos: [
      {
        id: 'testid',
        user_id: 'userid',
        content: 'content',
        status: TodoStatus.COMPLETED,
        created_date: 'date'
      },
      {
        id: 'testid2',
        user_id: 'userid2',
        content: 'content2',
        status: TodoStatus.COMPLETED,
        created_date: 'date'
      },
      {
        id: 'testid3',
        user_id: 'userid3',
        content: 'content3',
        status: TodoStatus.COMPLETED,
        created_date: 'date'
      }
    ]
  })
})

test('Toggle all todos active', () => {
  const state = {
    todos: [
    {
      id: 'testid',
      user_id: 'userid',
      content: 'content',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    },
    {
      id: 'testid2',
      user_id: 'userid2',
      content: 'content2',
      status: TodoStatus.COMPLETED,
      created_date: 'date'
    },
    {
      id: 'testid3',
      user_id: 'userid3',
      content: 'content3',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    }
  ]
  }

  const resp = reducer(state, {
    type: TOGGLE_ALL_TODOS,
    payload: false
  })

  expect(resp).toEqual({
    todos: [
      {
        id: 'testid',
        user_id: 'userid',
        content: 'content',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      },
      {
        id: 'testid2',
        user_id: 'userid2',
        content: 'content2',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      },
      {
        id: 'testid3',
        user_id: 'userid3',
        content: 'content3',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      }
    ]
  })
})

test('Delete todo', () => {
  const state = {
    todos: [{
        id: 'testid',
        user_id: 'userid',
        content: 'content',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      }]
  }

  const resp = reducer(state, {
    type: DELETE_TODO,
    payload: 'testid'
  })

  expect(resp).toEqual({
    todos: []
  })
})

test('Delete all todos', () => {
  const state = {
    todos: [
      {
        id: 'testid',
        user_id: 'userid',
        content: 'content',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      },
      {
        id: 'testid2',
        user_id: 'userid2',
        content: 'content2',
        status: TodoStatus.COMPLETED,
        created_date: 'date'
      },
      {
        id: 'testid3',
        user_id: 'userid3',
        content: 'content3',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      }
    ]
  }

  const resp = reducer(state, {
    type: DELETE_ALL_TODOS
  })

  expect(resp).toEqual({
    todos: []
  })
})

test('Set todos', () => {
  const state = {
    todos: []
  }

  const resp = reducer(state, {
    type: SET_TODO,
    payload: [
      {
        id: 'testid',
        user_id: 'userid',
        content: 'content',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      },
      {
        id: 'testid2',
        user_id: 'userid2',
        content: 'content2',
        status: TodoStatus.COMPLETED,
        created_date: 'date'
      },
      {
        id: 'testid3',
        user_id: 'userid3',
        content: 'content3',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      }
    ]
  })

  expect(resp).toEqual({
    todos: [
      {
        id: 'testid',
        user_id: 'userid',
        content: 'content',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      },
      {
        id: 'testid2',
        user_id: 'userid2',
        content: 'content2',
        status: TodoStatus.COMPLETED,
        created_date: 'date'
      },
      {
        id: 'testid3',
        user_id: 'userid3',
        content: 'content3',
        status: TodoStatus.ACTIVE,
        created_date: 'date'
      }
    ]
  })
})