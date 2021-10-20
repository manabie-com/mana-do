import React from "react";
import { TodoStatus } from "../../models/todo";
import {
  createTodo,
  CREATE_TODO,
  deleteAllTodos,
  deleteTodo,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  setShowing,
  setTodos,
  SET_SHOWING,
  SET_TODO,
  toggleAllTodos,
  TOGGLE_ALL_TODOS,
  updateTodoContent,
  updateTodoStatus,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from "../actions";

const getMockTodo = (
  data = {
    id: "todo",
    user_id: "user_id",
    content: "content",
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  }
) => data;

const getMockTodos = (
  data = [
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
  ]
) => data;

describe("actions", () => {
  it("setTodos", () => {
    const mockTodos = getMockTodos();

    const action = setTodos(mockTodos);

    expect(action.type).toEqual(SET_TODO);

    expect(action.payload).toEqual(mockTodos);
  });

  it("createTodo", () => {
    const mockTodo = getMockTodo();

    const action = createTodo(mockTodo);

    expect(action.type).toEqual(CREATE_TODO);

    expect(action.payload).toEqual(mockTodo);
  });

  it("updateTodoStatus", () => {
    const todoId = "todo";
    const checked = true;

    const action = updateTodoStatus(todoId, checked);

    expect(action.type).toEqual(UPDATE_TODO_STATUS);

    expect(action.payload.todoId).toEqual(todoId);

    expect(action.payload.checked).toEqual(checked);
  });

  it("deleteTodo", () => {
    const todoId = "todo";

    const action = deleteTodo(todoId);

    expect(action.type).toEqual(DELETE_TODO);

    expect(action.payload).toEqual(todoId);
  });

  it("deleteAllTodos", () => {
    const action = deleteAllTodos();

    expect(action.type).toEqual(DELETE_ALL_TODOS);
  });

  it("toggleAllTodos", () => {
    const checked = true;

    const action = toggleAllTodos(checked);

    expect(action.type).toEqual(TOGGLE_ALL_TODOS);

    expect(action.payload).toEqual(checked);
  });

  it("updateTodoContent", () => {
    const todoId = "todo";
    const content = "content";

    const action = updateTodoContent(todoId, content);

    expect(action.type).toEqual(UPDATE_TODO_CONTENT);

    expect(action.payload.todoId).toEqual(todoId);

    expect(action.payload.content).toEqual(content);
  });

  it("setShowing", () => {
    const showing = TodoStatus.ACTIVE;

    const action = setShowing(showing);

    expect(action.type).toEqual(SET_SHOWING);

    expect(action.payload).toEqual(showing);
  });
});
