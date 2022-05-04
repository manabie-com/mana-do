import React from "react";
import renderer from "react-test-renderer";
import TodoListItems from ".";
import * as AppContext from "../../../AppContext";
import { TodoStatus } from "../../../models/todo";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: jest.fn(),
  useState: jest.fn(),
}));

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

const todoId = "hfuwyr";

const mockedTodos = [
  {
    id: todoId,
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

beforeEach(() => {
  const mockContextValue = {
    state: {
      todos: mockedTodos,
    },
    dispatch: jest.fn(),
  };

  jest
    .spyOn(AppContext, "useAppContext")
    // @ts-ignore
    .mockImplementation(() => mockContextValue);
});

describe("snapshot", () => {
  test("should return snapshot", () => {
    const tree = renderer.create(<TodoListItems id={todoId} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("handle events", () => {
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  const mockClassListAddMethod = jest.fn();
  const setStateMock = jest.fn();
  const useStateMock = (initialValue: any) => [initialValue, setStateMock];
  const useRefMock = () => ({
    current: {
      classList: {
        add: mockClassListAddMethod,
      },
    },
  });
  jest.spyOn(React, "useRef").mockImplementation(useRefMock);
  // @ts-ignore
  jest.spyOn(React, "useState").mockImplementation(useStateMock);

  // test("should update todo status live by Enter keyboard", () => {
  //   const event = {
  //     key: "Enter",
  //     target: {
  //       value: "todo item edited",
  //     },
  //   };

  //   const expectedTodos = [
  //     {
  //       id: todoId,
  //       content: event.target.value,
  //       user_id: "firstUser",
  //       status: TodoStatus.All,
  //       created_date: "",
  //     },
  //     {
  //       id: "orislaj",
  //       content: "todo 2",
  //       user_id: "firstUser",
  //       status: TodoStatus.All,
  //       created_date: "",
  //     },
  //     {
  //       id: "jiwuro",
  //       content: "todo 3",
  //       user_id: "firstUser",
  //       status: TodoStatus.Active,
  //       created_date: "",
  //     },
  //     {
  //       id: "iejals",
  //       content: "todo 4",
  //       user_id: "firstUser",
  //       status: TodoStatus.Active,
  //       created_date: "",
  //     },
  //     {
  //       id: "jfuqos",
  //       content: "todo 5",
  //       user_id: "firstUser",
  //       status: TodoStatus.Completed,
  //       created_date: "",
  //     },
  //     {
  //       id: "ahsyel",
  //       content: "todo 6",
  //       user_id: "firstUser",
  //       status: TodoStatus.Completed,
  //       created_date: "",
  //     },
  //   ];
  //   const updateTodoContent = jest.spyOn(actions, "updateTodoContent");
  //   const wrapper = shallow(<TodoListItems id={todoId} />);
  //   const listItemWrapper = wrapper.find({ "data-testid": "list-item-wrapper" });
  //   listItemWrapper.simulate("dblclick");
  //   const inputEditTodoContent = listItemWrapper.find({ "data-testid": "live-edit-todo-content" });
  //   const inputEditTodoContentProps = inputEditTodoContent.props();

  //   // handle on change
  //   inputEditTodoContentProps.onChange(event);
  //   expect(setStateMock).toHaveBeenCalledWith(expectedTodos);

  //   // handle on Enter keydown
  //   inputEditTodoContentProps.onKeyDown(event);
  //   expect(setStateMock).toHaveBeenCalledWith(expectedTodos);
  //   expect(updateTodoContent).toHaveBeenCalledWith(todoId, event.target.value);
  // });

  // TODO: discard todo status live by onblur
  // test('should discard todo status live by onblur', () => {
  //
  // });
});
