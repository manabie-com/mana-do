import React from "react";
import { Constants } from "../../constants";
import { Todo, TodoStatus } from "../../models/todo";
import {
  CreateTodoAction,
  CREATE_TODO,
  DeleteAllTodosAction,
  DeleteTodoAction,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SetShowingAction,
  SET_SHOWING,
  ToggleAllTodosAction,
  TOGGLE_ALL_TODOS,
  UpdateTodoContentAction,
  UpdateTodoStatusAction,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from "../actions";
import reducer, { AppState } from "../reducer";

const getMockInitialState = (
  data = {
    todos: [
      {
        id: "todo1",
        user_id: "user_id1",
        content: "content1",
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
      },
      {
        id: "todo2",
        user_id: "user_id2",
        content: "content2",
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
      },
    ],
    showing: Constants.ALL,
  }
): AppState => data as AppState;

describe("reducer", () => {
  it("createTodo", () => {
    const initialState = getMockInitialState({
      todos: [],
      showing: Constants.ALL,
    });

    const action: CreateTodoAction = {
      type: CREATE_TODO,
      payload: {
        id: "todo",
        user_id: "user_id",
        content: "content",
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
      },
    };

    expect(reducer(initialState, action).todos).toEqual([action.payload]);
  });

  it("updateTodoStatus", () => {
    const initialState = getMockInitialState();

    const action: UpdateTodoStatusAction = {
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: "todo1",
        checked: true,
      },
    };

    expect(
      reducer(initialState, action).todos.find(
        (x) => x.id === action.payload.todoId
      )?.status
    ).toEqual(TodoStatus.COMPLETED);
  });

  it("toggleAllTodos", () => {
    const initialState = getMockInitialState();

    const action: ToggleAllTodosAction = {
      type: TOGGLE_ALL_TODOS,
      payload: true,
    };

    expect(
      reducer(initialState, action).todos.every(
        (x) => x.status === TodoStatus.COMPLETED
      )
    ).toEqual(true);
  });

  it("deleteTodo", () => {
    const initialState = getMockInitialState();

    const action: DeleteTodoAction = {
      type: DELETE_TODO,
      payload: "todo1",
    };

    expect(
      reducer(initialState, action).todos.find((x) => x.id === action.payload)
    ).toEqual(undefined);
  });

  it("deleteAllTodos", () => {
    const initialState = getMockInitialState();

    const action: DeleteAllTodosAction = {
      type: DELETE_ALL_TODOS,
    };

    expect(reducer(initialState, action).todos).toEqual([]);
  });

  it("updateTodoContent", () => {
    const initialState = getMockInitialState();

    const action: UpdateTodoContentAction = {
      type: UPDATE_TODO_CONTENT,
      payload: {
        todoId: "todo1",
        content: "New Content",
      },
    };

    expect(
      reducer(initialState, action).todos.find(
        (x) => x.id === action.payload.todoId
      )?.content
    ).toEqual(action.payload.content);
  });

  it("setShowing", () => {
    const initialState = getMockInitialState();

    const action: SetShowingAction = {
      type: SET_SHOWING,
      payload: TodoStatus.ACTIVE,
    };

    expect(reducer(initialState, action).showing).toEqual(TodoStatus.ACTIVE);
  });
});
