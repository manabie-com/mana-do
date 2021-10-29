import React from "react";
import List from "component/Todo/List";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Todo } from "models/todo";
import { mockTodos } from "data/mockData";
import todoReducer from "store/reducer";
import { EnhanceTodoStatus } from "component/Todo";
import { TodoStatus } from "models/todo";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

type functionProps = {
  showing: EnhanceTodoStatus;
  initialTodos: Todo[];
};

export const ListView = ({ initialTodos, showing = "ALL" }: functionProps) => {
  const [{ todos }, dispatch] = React.useReducer(todoReducer, {
    todos: initialTodos,
  });
  return <List todos={todos} dispatch={dispatch} showing={showing} />;
};

describe("Todo List test", () => {
  test("when todos are empty => show no div with todo__item className", () => {
    render(<ListView initialTodos={[]} showing="ALL" />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
  test("should show all todos with associated content", () => {
    render(<ListView initialTodos={mockTodos} showing="ALL" />);
    // make sure the same amount of todos got rendered
    expect(screen.queryAllByRole("listitem").length).toEqual(mockTodos.length);
    // make sure the content shown correctly
    mockTodos.forEach((el) =>
      expect(screen.getByText(el.content)).toBeInTheDocument()
    );
  });
  test("double click on todo content should show modal", () => {
    const idToTest = mockTodos[0].id;
    render(<ListView initialTodos={mockTodos} showing="ALL" />);
    const todoContent = screen.getByTestId(`todo-content-${idToTest}`);
    userEvent.dblClick(todoContent);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
  test("when click delete button, one 1 todo should be deleted", async () => {
    const idToTest = mockTodos[2].id;
    render(<ListView initialTodos={mockTodos} showing="ALL" />);
    const deleteButton = screen.getByTestId(`delete-button-${idToTest}`);
    userEvent.click(deleteButton);
    // make sure only delete 1 todo
    expect(screen.queryAllByRole("listitem").length).toEqual(
      mockTodos.length - 1
    );
    // make sure the right todo is deleted
    expect(
      screen.queryByTestId(`todo-item-${idToTest}`)
    ).not.toBeInTheDocument();
  });
  test("when todo is checked, it's input checked state should change ", () => {
    const idToTest = mockTodos[3].id;
    render(<ListView initialTodos={mockTodos} showing="ALL" />);
    const checkInput = screen.getByTestId(`checkbox-${idToTest}`);
    const currentState = checkInput.checked;
    userEvent.click(checkInput);
    expect(checkInput.checked).not.toEqual(currentState);
  });
  test("Filtering todos - ALL", () => {
    render(<ListView initialTodos={mockTodos} showing="ALL" />);
    let numberOfShownTodos = screen.queryAllByRole("listitem").length;
    // when filter ALL, number of list items shown should be the same length
    // with mock todos/ initial todos
    expect(numberOfShownTodos).toBe(mockTodos.length);
  });
  test("Filtering todos - COMPLETED", () => {
    render(
      <ListView initialTodos={mockTodos} showing={TodoStatus.COMPLETED} />
    );
    let numberOfShownTodos = screen.queryAllByRole("listitem").length;
    expect(numberOfShownTodos).toBe(
      mockTodos.filter((el) => el.status === TodoStatus.COMPLETED).length
    );
  });
  test("Filtering todos - ACTIVE", () => {
    render(<ListView initialTodos={mockTodos} showing={TodoStatus.ACTIVE} />);
    let numberOfShownTodos = screen.queryAllByRole("listitem").length;
    expect(numberOfShownTodos).toBe(
      mockTodos.filter((el) => el.status === TodoStatus.ACTIVE).length
    );
  });
});
