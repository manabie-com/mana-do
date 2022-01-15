import { 
  CREATE_TODO, 
  DELETE_ALL_TODOS, 
  DELETE_TODO, 
  TOGGLE_ALL_TODOS, 
  UPDATE_TODO_STATUS 
} from "store/action-types";
import { 
  CreateTodoAction, 
  DeleteAllTodosAction, 
  DeleteTodoAction, 
  ToggleAllTodosAction, 
  UpdateTodoStatusAction 
} from "store/actions";
import reducer, { AppState } from "store/reducer";
import { TodoStatus } from "models/todo";

describe("app reducer tests", () => {
  const createdDate = new Date().toISOString();

  test("return initial state if don't have action", () => {
    const initialState: AppState = {
      todos: []
    }
    const newState = reducer(initialState, undefined);
    const expectedState: AppState = {
      todos: []
    }
    expect(newState).toEqual(expectedState);
  })
  test("return correct todos upon receiving an action of type `CREATE_TODO`", () => {
    const initialState: AppState = {
      todos: []
    }
    const action: CreateTodoAction = {
      type: CREATE_TODO,
      payload: {
        id: "id_1",
        user_id: "test",
        content : "test",
        created_date: createdDate,
      }
    }
    const newState = reducer(initialState, action);
    const expectedState: AppState = {
      todos: [
        {
          id: "id_1",
          user_id: "test",
          content : "test",
          created_date: createdDate,
        }
      ]
    }
    expect(newState).toEqual(expectedState);
  })
  test("return correct todos upon receiving an action of type `UPDATE_TODO_STATUS`", () => {
    const initialState: AppState = {
      todos: [
        {
          id: "id_1",
          user_id: "test",
          content : "test",
          status: TodoStatus.ACTIVE,
          created_date: createdDate,
        }
      ]
    }
    const action: UpdateTodoStatusAction = {
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: "id_1",
        checked: true
      }
    }
    const newState = reducer(initialState, action);
    const expectedState: AppState = {
      todos: [
        {
          id: "id_1",
          user_id: "test",
          content : "test",
          status: TodoStatus.COMPLETED,
          created_date: createdDate,
        }
      ]
    }
    expect(newState).toEqual(expectedState);
  })
  test("return correct todos upon receiving an action of type `TOGGLE_ALL_TODOS`", () => {
    const initialState: AppState = {
      todos: [
        {
          id: "id_1",
          user_id: "test",
          content : "test",
          status: TodoStatus.ACTIVE,
          created_date: createdDate,
        },
        {
          id: "id_2",
          user_id: "test",
          content : "test",
          status: TodoStatus.ACTIVE,
          created_date: createdDate,
        }
      ]
    }
    const action: ToggleAllTodosAction = {
      type: TOGGLE_ALL_TODOS,
      payload: true
    }
    const newState = reducer(initialState, action);
    const expectedState: AppState = {
      todos: [
        {
          id: "id_1",
          user_id: "test",
          content : "test",
          status: TodoStatus.COMPLETED,
          created_date: createdDate,
        },
        {
          id: "id_2",
          user_id: "test",
          content : "test",
          status: TodoStatus.COMPLETED,
          created_date: createdDate,
        }
      ]
    }
    expect(newState).toEqual(expectedState);
  })
  test("return correct todos upon receiving an action of type `DELETE_TODO`", () => {
    const initialState: AppState = {
      todos: [
        {
          id: "id_1",
          user_id: "test",
          content : "test",
          status: TodoStatus.ACTIVE,
          created_date: createdDate,
        }
      ]
    }
    const action: DeleteTodoAction = {
      type: DELETE_TODO,
      payload: "id_1"
    }
    const newState = reducer(initialState, action);
    const expectedState: AppState = {
      todos: []
    }
    expect(newState).toEqual(expectedState);
  })
  test("return correct todos upon receiving an action of type `DELETE_ALL_TODOS`", () => {
    const initialState: AppState = {
      todos: [
        {
          id: "id_1",
          user_id: "test",
          content : "test",
          status: TodoStatus.ACTIVE,
          created_date: createdDate,
        },
        {
          id: "id_2",
          user_id: "test",
          content : "test",
          status: TodoStatus.ACTIVE,
          created_date: createdDate,
        }
      ]
    }
    const action: DeleteAllTodosAction = {
      type: DELETE_ALL_TODOS,
    }
    const newState = reducer(initialState, action);
    const expectedState: AppState = {
      todos: []
    }
    expect(newState).toEqual(expectedState);
  })
})