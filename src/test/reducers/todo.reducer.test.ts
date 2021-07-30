import TodoReducer, { initialState } from 'root/store/reducers/todo.reducer';
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT
} from 'root/store/actions/todo.actions';
import { TodoStatus } from 'root/models/todo';

const createTodo = (data: any) => ({
  id: 'test-id',
  user_id: 'test-user',
  content : 'test-content',
  status: TodoStatus.ACTIVE,
  created_date: '',
  ...data
})

const fakeState = (dataFake: any) => ({
  ...initialState,
  ...dataFake
})

describe('Todo reducer', () => {
  test('Length of list todo should increase 1', async () => {
    const state = TodoReducer(initialState, { type: CREATE_TODO, payload: createTodo({}) })
    expect(state.todos.length).toEqual(1);
  })

  test('Length of list todo should equal 2', async () => {
    const state = TodoReducer(fakeState({
      todos: [
        createTodo({ id: 'todo-id-1' })
      ]
    }), { type: CREATE_TODO, payload: createTodo({}) })
    expect(state.todos.length).toEqual(2);
  })

  test('List todo should be empty', async () => {
    const state = TodoReducer(fakeState({ todos: [
      createTodo({}),
      createTodo({ id: 'test-todo-2' })
    ] }), { type: DELETE_ALL_TODOS })
    expect(state.todos).toBeEmpty;
  })

  test('Todos shound be updated', async () => {
    const state = TodoReducer(fakeState({
      todos: [createTodo({
        id: 'test-todo-1',
        content: 'default-content'
      })]
    }), { type: SET_TODO, payload: [createTodo({
      id: 'test-todo-2',
      content: 'test-todo-content-2'
    })]})
    expect(state.todos).not.toBeEmpty;
    expect(state.todos).toHaveLength;
    expect(state.todos[0].id).toEqual('test-todo-2')
    expect(state.todos[0].content).toEqual('test-todo-content-2')
  })

  test('todos length should be decreased by 1', async () => {
    const state = TodoReducer(fakeState({ todos: [
      createTodo({}),
      createTodo({ id: 'test-todo-2' }),
      createTodo({ id: 'test-todo-3' })
    ] }), { type: DELETE_TODO, payload: 'test-todo-2' })
    expect(state.todos.length).toEqual(2);
  })

  test('All todo should be completed', async () => {
    const state = TodoReducer(fakeState({
      todos: [
        createTodo({
          id: 'todo-1',
          status: TodoStatus.ACTIVE
        }),
        createTodo({
          id: 'todo-2',
          status: TodoStatus.COMPLETED
        }),
        createTodo({
          id: 'todo-3',
          status: TodoStatus.ACTIVE
        })
      ]
    }), { type: TOGGLE_ALL_TODOS, payload: true })
    const completedTodos = state.todos.filter((todo) => todo.status === TodoStatus.COMPLETED)
    expect(completedTodos).toHaveLength
    expect(completedTodos.length).toEqual(3)
  })

  test('All todo should be active', async () => {
    const state = TodoReducer(fakeState({
      todos: [
        createTodo({
          id: 'todo-1',
          status: TodoStatus.COMPLETED
        }),
        createTodo({
          id: 'todo-2',
          status: TodoStatus.COMPLETED
        }),
        createTodo({
          id: 'todo-3',
          status: TodoStatus.ACTIVE
        })
      ]
    }), { type: TOGGLE_ALL_TODOS, payload: false })
    const activeTodos = state.todos.filter((todo) => todo.status === TodoStatus.ACTIVE)
    expect(activeTodos).toHaveLength
    expect(activeTodos.length).toEqual(3)
  })

  test('Todo status should be updated', async () => {
    const state = TodoReducer(fakeState({
      todos: [
        createTodo({ id: 'test-todo-1', status: TodoStatus.ACTIVE }),
        createTodo({ id: 'test-todo-2', status: TodoStatus.COMPLETED })
      ]
    }), { type: UPDATE_TODO_STATUS, payload: {
      todoId: 'test-todo-1',
      checked: true
    } })
    const updatedTodo = state.todos.find((todo) => todo.id === 'test-todo-1')
    expect(updatedTodo).not.toBeUndefined;
    expect(updatedTodo?.status).toEqual(TodoStatus.COMPLETED);
  })

  test('Todo content should be updated', async () => {
    const state = TodoReducer(fakeState({
      todos: [
        createTodo({ id: 'test-todo-1', content: 'content-todo-1' }),
        createTodo({ id: 'test-todo-2', content: 'content-todo-2' })
      ]
    }), { type: UPDATE_TODO_CONTENT, payload: {
      todoId: 'test-todo-1',
      content: 'updated-todo-content-1'
    } })
    const updatedTodo = state.todos.find((todo) => todo.id === 'test-todo-1')
    expect(updatedTodo).not.toBeUndefined;
    expect(updatedTodo?.content).toEqual('updated-todo-content-1');
  })
})
