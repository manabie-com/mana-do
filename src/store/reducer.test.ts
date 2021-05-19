import { cleanup } from "@testing-library/react";
import reducer, { initialState } from "./reducer";
import { createTodo, setTodos } from "./actions";
import { TodoStatus } from "../models/todo";
import shortid from "shortid";

afterEach(cleanup);

describe("Test the reducer and actions", () => {
  it("should return the initial state", () => {
    expect(initialState).toEqual({ todos: [], toggleAll: false });
  });

  it("dispatch action `SET_TODO` should change todos property from empty array to not empty", () => {
    const todos = [
      {
        content: "data-test=[Testing text]",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      },
    ];
    const action = setTodos(todos);
    expect(reducer(initialState, action).todos.length).toEqual(todos.length);
  });
  it("dispatch action `CREATE_TODO` should change todos property from empty array to list has one item", () => {
    const todo = {
      content: "data-test=[Testing text]",
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    };
    const action = createTodo(todo);
    expect(reducer(initialState, action).todos.length).toEqual(1);
  });
  it("dispatch action `UPDATE_TODO` should change item in todos", () => {
    const todos = [
      {
        content: "data-test=[Testing text]",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      },
    ];
    let action_1 = setTodos(todos);
    let state = reducer(initialState, action_1);
    let updateTodo = todos[0];
    updateTodo.status = TodoStatus.COMPLETED;
    let action_2 = createTodo(updateTodo);
    expect(reducer(state, action_2).todos[0].status).toEqual(TodoStatus.COMPLETED);
  });
});
