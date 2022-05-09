import { Todo } from '../../models/todo'
import {
  createTodo,
  CreateTodoAction,
  CREATE_TODO,
  updateTodoData,
  UpdateTodoDataAction,
  deleteAllTodos,
  DeleteAllTodosAction,
  deleteItemTodoData,
  DeleteTodoAction,
  ToggleAllTodosAction,
  toggleAllTodos,
} from '../actions'
import featuresReducer, { AppState } from '../reducer'

describe('Reducer function test', () => {
  let featuresState: AppState = {
    todos: [],
  }
  afterEach(() => {
    featuresState = { todos: [] }
  })

  test('test with action empty', () => {
    const newState = featuresReducer(featuresState, { type: 'ACTION_FOR_TEST' })
    expect(newState).toEqual({ todos: [] })
  })

  test('should new todos data when CREATE_TODO action is dispatched', () => {
    const actionCreate = createTodo(createTodoDataTest.mock.payload)
    expect(actionCreate).toEqual(createTodoDataTest.mock)
    const newState = featuresReducer(featuresState, actionCreate)
    expect(newState).toEqual(createTodoDataTest.expect)
  })

  test('should update content when UPDATE_TODO_DATA with payload is content action is dispatched', () => {
    featuresState.todos.push(dataTestUpdateTodoContent.initState)
    const actionUpdate = updateTodoData('GPIkUEOO0', { content: 'test 2' })
    expect(actionUpdate).toEqual(dataTestUpdateTodoContent.mock)
    const newState = featuresReducer(featuresState, actionUpdate)
    expect(newState).toEqual(dataTestUpdateTodoContent.expect)
  })

  test('should update content when UPDATE_TODO_DATA with payload is status action is dispatched', () => {
    featuresState.todos.push(dataTestUpdateTodoStatus.initState)
    const actionUpdate = updateTodoData('GPIkUEOO1', { status: 'COMPLETED' })
    expect(actionUpdate).toEqual(dataTestUpdateTodoStatus.mock)
    const newState = featuresReducer(featuresState, actionUpdate)
    expect(newState).toEqual(dataTestUpdateTodoStatus.expect)
  })

  test('should remove all todos data when DELETE_ALL_TODOS action is dispatched', () => {
    featuresState.todos = featuresState.todos.concat(
      dataTestDeleteTodo.initState
    )
    const actionDeleteAll = deleteAllTodos()
    expect(actionDeleteAll).toEqual(dataTestDeleteAllTodo.mock)
    const newState = featuresReducer(featuresState, actionDeleteAll)
    expect(newState).toEqual(dataTestDeleteAllTodo.expect)
  })

  test('should remove todo data when DELETE_TODO action is dispatched', () => {
    featuresState.todos = featuresState.todos.concat(
      dataTestDeleteTodo.initState
    )
    const actionDelete = deleteItemTodoData('L3MNEhzYE')
    expect(actionDelete).toEqual(dataTestDeleteTodo.mock)
    const newState = featuresReducer(featuresState, actionDelete)
    expect(newState).toEqual(dataTestDeleteTodo.expect)
  })

  test('should toggle status todo data when TOGGLE_ALL_TODOS with payload ACTION action is dispatched', () => {
    featuresState.todos = featuresState.todos.concat(
      dataTestToggleStatusTodo.initState
    )
    const actionToggleStatus = toggleAllTodos(true)
    expect(actionToggleStatus).toEqual(dataTestToggleStatusTodo.mock)
    const newState = featuresReducer(featuresState, actionToggleStatus)
    expect(newState).toEqual(dataTestToggleStatusTodo.expect)
  })
})

const createTodoDataTest: { mock: CreateTodoAction; expect: Todo } = {
  mock: {
    type: CREATE_TODO,
    payload: {
      content: 'aefef',
      created_date: '2022-05-06T08:02:59.185Z',
      status: 'ACTIVE',
      id: 'vOcDqS1ri',
      user_id: 'firstUser',
    },
  },
  expect: {
    todos: [
      {
        content: 'aefef',
        created_date: '2022-05-06T08:02:59.185Z',
        status: 'ACTIVE',
        id: 'vOcDqS1ri',
        user_id: 'firstUser',
      },
    ],
  },
}

const dataTestUpdateTodoContent: {
  initState: Todo
  mock: UpdateTodoDataAction
  expect: Todo
} = {
  initState: {
    content: 'test 1',
    created_date: '2022-05-06T08:02:59.185Z',
    status: 'ACTIVE',
    id: 'GPIkUEOO0',
    user_id: 'firstUser',
  },
  mock: {
    type: 'UPDATE_TODO_DATA',
    payload: { todoId: 'GPIkUEOO0', values: { content: 'test 2' } },
  },
  expect: {
    todos: [
      {
        content: 'test 2',
        created_date: '2022-05-06T08:02:59.185Z',
        status: 'ACTIVE',
        id: 'GPIkUEOO0',
        user_id: 'firstUser',
      },
    ],
  },
}

const dataTestUpdateTodoStatus: {
  initState: Todo
  mock: UpdateTodoDataAction
  expect: Todo
} = {
  initState: {
    content: 'test 1',
    created_date: '2022-05-06T08:02:59.185Z',
    status: 'ACTIVE',
    id: 'GPIkUEOO1',
    user_id: 'firstUser',
  },
  mock: {
    type: 'UPDATE_TODO_DATA',
    payload: { todoId: 'GPIkUEOO1', values: { status: 'COMPLETED' } },
  },
  expect: {
    todos: [
      {
        content: 'test 1',
        created_date: '2022-05-06T08:02:59.185Z',
        status: 'COMPLETED',
        id: 'GPIkUEOO1',
        user_id: 'firstUser',
      },
    ],
  },
}

const dataTestDeleteAllTodo: {
  initState: Todo
  mock: DeleteAllTodosAction
  expect: Todo
} = {
  initState: [
    {
      content: 'test 1',
      created_date: '2022-05-06T08:02:59.185Z',
      status: 'ACTIVE',
      id: 'GPIkUEOO1',
      user_id: 'firstUser',
    },
    {
      content: 'test 2',
      created_date: '2022-05-06T08:02:59.185Z',
      status: 'COMPLETED',
      id: 'Gjuiofet',
      user_id: 'firstUser',
    },
  ],
  mock: {
    type: 'DELETE_ALL_TODOS',
  },
  expect: {
    todos: [],
  },
}

const dataTestDeleteTodo: {
  initState: Todo
  mock: DeleteTodoAction
  expect: Todo
} = {
  initState: [
    {
      content: 'test 1',
      created_date: '2022-05-06T08:02:59.185Z',
      status: 'ACTIVE',
      id: 'GPIkUEOO1',
      user_id: 'firstUser',
    },
    {
      content: 'test 2',
      created_date: '2022-05-06T08:02:59.185Z',
      status: 'COMPLETED',
      id: 'L3MNEhzYE',
      user_id: 'firstUser',
    },
  ],
  mock: {
    type: 'DELETE_TODO',
    payload: {
      idItem: 'L3MNEhzYE',
    },
  },
  expect: {
    todos: [
      {
        content: 'test 1',
        created_date: '2022-05-06T08:02:59.185Z',
        status: 'ACTIVE',
        id: 'GPIkUEOO1',
        user_id: 'firstUser',
      },
    ],
  },
}

const dataTestToggleStatusTodo: {
  initState: Todo
  mock: ToggleAllTodosAction
  expect: Todo
} = {
  initState: [
    {
      content: 'test 1',
      created_date: '2022-05-06T08:02:59.185Z',
      status: 'ACTIVE',
      id: 'GPIkUEOO1',
      user_id: 'firstUser',
    },
    {
      content: 'test 2',
      created_date: '2022-05-06T08:02:59.185Z',
      status: 'ACTIVE',
      id: 'L3MNEhzYE',
      user_id: 'firstUser',
    },
  ],
  mock: {
    type: 'TOGGLE_ALL_TODOS',
    payload: true,
  },
  expect: {
    todos: [
      {
        content: 'test 1',
        created_date: '2022-05-06T08:02:59.185Z',
        status: 'COMPLETED',
        id: 'GPIkUEOO1',
        user_id: 'firstUser',
      },
      {
        content: 'test 2',
        created_date: '2022-05-06T08:02:59.185Z',
        status: 'COMPLETED',
        id: 'L3MNEhzYE',
        user_id: 'firstUser',
      },
    ],
  },
}
