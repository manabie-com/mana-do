import {
  CREATE_TODO,
  CreateTodoAction,
  SET_TODO,
  SetTodoAction,
  DeleteAllTodosAction,
} from "./actions";
import { TodoStatus, Todo } from '../models/todo';
import shortid from "shortid";
import reducer from "./reducer";
import { LocalStore } from '../utils/local-store';
import { AppState } from './reducer';
import { UpdateTodoStatusAction, UPDATE_TODO_STATUS, TOGGLE_ALL_TODOS, ToggleAllTodosAction, DeleteTodoAction, DELETE_TODO, DELETE_ALL_TODOS, AppActions } from './actions';

describe("reducer test", () => {
  beforeEach(() => {
    if (!LocalStore.getCachedState().todos) {
      LocalStore.setCachedState({ todos: []});
    }
  })
  test("GET TODOS - SUCCESS", () => {
    const state = { todos: [] };
    const action: SetTodoAction = {
      type: SET_TODO,
      payload: [
        {
          content: "a",
          created_date: "2022-05-17T03:52:21.464Z",
          status: TodoStatus.ACTIVE,
          id: "N0E1scqbt",
          user_id: "firstUser",
        },
        {
          content: "b",
          created_date: "2022-05-17T03:52:21.773Z",
          status: TodoStatus.ACTIVE,
          id: "MvBcBvXxKI",
          user_id: "firstUser",
        },
        {
          content: "c",
          created_date: "2022-05-17T03:52:22.078Z",
          status: TodoStatus.ACTIVE,
          id: "mF8RqtO_7",
          user_id: "firstUser",
        },
        {
          content: "d",
          created_date: "2022-05-17T03:52:22.371Z",
          status: TodoStatus.ACTIVE,
          id: "c7dQ8p4R7C",
          user_id: "firstUser",
        },
      ],
    };
    const getToDoSuccess = reducer(state, action);
    expect(Array.isArray(getToDoSuccess.todos)).toBe(true);
  });
  test("CREATE A TODO - SUCCESS", () => {
    const state = { todos: [] };
    const action: CreateTodoAction = {
      type: CREATE_TODO,
      payload: {
        content: "Mock todo 1",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      },
    };
    const createToDoSuccess = reducer(state, action);
    expect(createToDoSuccess.todos[createToDoSuccess.todos.length - 1].content).toEqual("Mock todo 1");
    expect(createToDoSuccess.todos[createToDoSuccess.todos.length - 1].user_id).toEqual("firstUser");
    expect(createToDoSuccess.todos[createToDoSuccess.todos.length - 1].status).toEqual(TodoStatus.ACTIVE);
    expect(createToDoSuccess.todos[createToDoSuccess.todos.length - 1].created_date).toBeTruthy();
    expect(createToDoSuccess.todos[createToDoSuccess.todos.length - 1].id).toBeTruthy();
  });

  test("CREATE A TODO - FAIL - EMPTY CONTENT", () => {
    const state = { todos: [] };
    const action: CreateTodoAction = {
      type: CREATE_TODO,
      payload: {
        content: "",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      },
    };
    const createToDoSuccess = reducer(state, action);
    expect(createToDoSuccess.todos.length).toEqual(state.todos.length);
  });

  test("UPDATE A TODO STATUS FROM ACTIVE TO COMPLETED - SUCCESS", () => {
    const id = shortid();
    const state: AppState = { todos: [
      {
        id,
        content: 'Apply for a job',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        user_id: 'firstUser'
      }
    ] };
    const action: UpdateTodoStatusAction = {
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: id,
        checked: true
      }
    };
    const updateToDoSuccess = reducer(state, action);
    expect(updateToDoSuccess.todos.find(todo => todo.id === id)?.status).toEqual(TodoStatus.COMPLETED);
  });

  test("UPDATE A TODO STATUS FROM COMPLETED TO ACTIVE - SUCCESS", () => {
    const id = shortid();
    const state: AppState = { todos: [
      {
        id,
        content: 'Apply for a job',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      }
    ] };
    const action: UpdateTodoStatusAction = {
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: id,
        checked: false
      }
    };
    const updateToDoSuccess = reducer(state, action);
    expect(updateToDoSuccess.todos.find(todo => todo.id === id)?.status).toEqual(TodoStatus.ACTIVE);
  });

  test("UPDATE ALL TODOS STATUS FROM ACTIVE TO COMPLETED - SUCCESS", () => {
    const state: AppState = { todos: [
      {
        id: shortid(),
        content: 'Apply for a job',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        user_id: 'firstUser'
      },
      {
        id: shortid(),
        content: 'Have breakfast',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      }
    ] };
    const action: ToggleAllTodosAction = {
      type: TOGGLE_ALL_TODOS,
      payload: true
    };
    const updateToDoSuccess = reducer(state, action);
    expect(updateToDoSuccess.todos.every((todo: Todo) => todo.status === TodoStatus.COMPLETED)).toEqual(true);
  });

  test("UPDATE ALL TODOS STATUS FROM ACTIVE TO COMPLETED - SUCCESS", () => {
    const state: AppState = { todos: [
      {
        id: shortid(),
        content: 'Apply for a job',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      },
      {
        id: shortid(),
        content: 'Have breakfast',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        user_id: 'firstUser'
      }
    ] };
    const action: ToggleAllTodosAction = {
      type: TOGGLE_ALL_TODOS,
      payload: true
    };
    const updateToDoSuccess = reducer(state, action);
    expect(updateToDoSuccess.todos.every((todo: Todo) => todo.status === TodoStatus.COMPLETED)).toEqual(true);
  });
  
  test("UPDATE ALL TODOS STATUS FROM COMPLETED TO ACTIVE - SUCCESS", () => {
    const state: AppState = { todos: [
      {
        id: shortid(),
        content: 'Apply for a job',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      },
      {
        id: shortid(),
        content: 'Have breakfast',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        user_id: 'firstUser'
      }
    ] };
    const action: ToggleAllTodosAction = {
      type: TOGGLE_ALL_TODOS,
      payload: false
    };
    const updateToDoSuccess = reducer(state, action);
    expect(updateToDoSuccess.todos.every((todo: Todo) => todo.status === TodoStatus.ACTIVE)).toEqual(true);
  });

  test("DELETE A TODO BY ID - SUCCESS", () => {
    const selectedId = shortid();
    const state: AppState = { todos: [
      {
        id: shortid(),
        content: 'Apply for a job',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      },
      {
        id: shortid(),
        content: 'Have breakfast',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      },
      {
        id: selectedId,
        content: 'Have breakfast',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      }
    ] };
    const action: DeleteTodoAction = {
      type: DELETE_TODO,
      payload: selectedId
    };
    const updateAllToDoSuccess = reducer(state, action);
    expect(updateAllToDoSuccess.todos.find((todo: Todo) => todo.id === selectedId)).toBeFalsy();
  });

  test("DELETE ALL TODOS - SUCCESS", () => {
    const state: AppState = { todos: [
      {
        id: shortid(),
        content: 'Apply for a job',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      },
      {
        id: shortid(),
        content: 'Have breakfast',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      },
      {
        id: shortid(),
        content: 'Have breakfast',
        created_date: new Date().toISOString(),
        status: TodoStatus.COMPLETED,
        user_id: 'firstUser'
      }
    ] };
    const action: DeleteAllTodosAction = {
      type: DELETE_ALL_TODOS
    };
    const deleteAllToDoSuccess = reducer(state, action);
    expect(deleteAllToDoSuccess.todos.length).toEqual(0);
  });
});
