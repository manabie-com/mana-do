import React from "react";
import renderer from "react-test-renderer";

import TodoList from ".";
import * as AppContext from "../../../AppContext";
import { TodoLoadingStatus, TodoStatus } from "../../../models/todo";

jest.mock("../TodoListItems", () => "TodoListItems");

jest.mock("react-beautiful-dnd", () => ({
  Droppable: ({ children }: any) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  Draggable: ({ children }: any) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  DragDropContext: ({ children }: any) => children,
}));

const mockDispatch = jest.fn();

const mockedTodos = [
  {
    id: "hfuwyr",
    content: "todo 1",
    user_id: "firstUser",
    status: TodoStatus.All,
    created_date: "",
  },
  {
    id: "orislaj",
    content: "todo 2",
    user_id: "firstUser",
    status: TodoStatus.All,
    created_date: "",
  },
  {
    id: "jiwuro",
    content: "todo 3",
    user_id: "firstUser",
    status: TodoStatus.Active,
    created_date: "",
  },
  {
    id: "iejals",
    content: "todo 4",
    user_id: "firstUser",
    status: TodoStatus.Active,
    created_date: "",
  },
  {
    id: "jfuqos",
    content: "todo 5",
    user_id: "firstUser",
    status: TodoStatus.Completed,
    created_date: "",
  },
  {
    id: "ahsyel",
    content: "todo 6",
    user_id: "firstUser",
    status: TodoStatus.Completed,
    created_date: "",
  },
];

describe("snapshot", () => {
  const mockContextValue = {
    state: {
      todos: mockedTodos,
      filter: {},
    },
    dispatch: mockDispatch,
  };

  test("should return snapshot when fetched data done", () => {
    const newMockContextValue = {
      ...mockContextValue,
      state: {
        ...mockContextValue.state,
        todosLoadStatus: TodoLoadingStatus.Idle,
      },
    };
    jest
      .spyOn(AppContext, "useAppContext")
      // @ts-ignore
      .mockImplementation(() => newMockContextValue);

    const tree = renderer.create(<TodoList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should return snapshot when fetching data not done yet", () => {
    const newMockContextValue = {
      ...mockContextValue,
      state: {
        ...mockContextValue.state,
        todosLoadStatus: TodoLoadingStatus.Loading,
      },
    };
    jest
      .spyOn(AppContext, "useAppContext")
      // @ts-ignore
      .mockImplementation(() => newMockContextValue);
    const tree = renderer.create(<TodoList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("todos filter by status", () => {
  // test("should return correct number of todo item with status is ALL", () => {
  //   const mockContextValue = {
  //     state: {
  //       theme: Themes.Light,
  //       todos: mockedTodos,
  //       todosLoadStatus: TodoLoadingStatus.Idle,
  //       filter: {
  //         status: TodoStatus.All,
  //       },
  //     },
  //     dispatch: mockDispatch,
  //   };
  //   jest.spyOn(AppContext, "useAppContext").mockImplementation(() => mockContextValue);
  //   const wrapper = shallow(<TodoList />);
  //   const TodoListItems = wrapper.find("TodoListItems");
  //   expect(TodoListItems.length).toBe(mockedTodos.length);
  // });
  // test("should return correct number of todo item with status is ACTIVE", () => {
  //   const mockContextValue = {
  //     state: {
  //       todos: mockedTodos,
  //       todosLoadStatus: TodoLoadingStatus.Idle,
  //       filter: {
  //         status: TodoStatus.Active,
  //       },
  //     },
  //     dispatch: mockDispatch,
  //   };
  //   jest
  //     .spyOn(AppContext, "useAppContext")
  //     // @ts-ignore
  //     .mockImplementation(() => mockContextValue);
  //   const wrapper = shallow(<TodoList />);
  //   const TodoListItems = wrapper.find("Draggable");
  //   expect(TodoListItems.length).toBe(2);
  // });
  // test("should return correct number of todo item with status is COMPLETED", () => {
  //   const mockContextValue = {
  //     state: {
  //       todos: mockedTodos,
  //       todosLoadStatus: TodoLoadingStatus.Idle,
  //       filter: {
  //         status: TodoStatus.Completed,
  //       },
  //     },
  //     dispatch: mockDispatch,
  //   };
  //   jest
  //     .spyOn(AppContext, "useAppContext")
  //     // @ts-ignore
  //     .mockImplementation(() => mockContextValue);
  //   const wrapper = shallow(<TodoList />);
  //   const TodoListItems = wrapper.find("Draggable");
  //   expect(TodoListItems.length).toBe(2);
  // });
});
