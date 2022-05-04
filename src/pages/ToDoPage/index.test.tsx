import * as React from "react";
import renderer from "react-test-renderer";
import { createRoot } from "react-dom/client";

import * as AppContext from "../../AppContext";
import ToDoPage from ".";
import { TodoStatus } from "../../models/todo";

jest
  .mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
  }))
  .mock("../../components/Footer", () => "Footer")
  .mock("../../components/todos/TodoList", () => "TodoList")
  .mock("../../layouts/main", () => "Layout");

let container: any = null;
let root: any = null;
const mockDispatch = jest.fn();

beforeEach(() => {
  const mockContextValue = {
    state: {
      todos: [],
    },
    dispatch: mockDispatch,
  };
  jest
    .spyOn(AppContext, "useAppContext")
    // @ts-ignore
    .mockImplementation(() => mockContextValue);

  container = document.createElement("div");
  root = createRoot(container);
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  root.unmount();
  container.remove();
  container = null;
});

describe("snapshot", () => {
  test("should return snapshot", () => {
    const tree = renderer.create(<ToDoPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("create todo list", () => {
  const setTodosValue = jest.fn();
  const mockedTodos = [
    {
      id: "hfuwyr",
      content: "todo 1",
      user_id: "firstUser",
      status: TodoStatus.Active,
      created_date: "",
    },
    {
      id: "orislaj",
      content: "todo 2",
      user_id: "firstUser",
      status: TodoStatus.Active,
      created_date: "",
    },
  ];
  const useStateMock = () => [mockedTodos, setTodosValue];

  // @ts-ignore
  jest.spyOn(React, "useState").mockImplementation(useStateMock);
});
