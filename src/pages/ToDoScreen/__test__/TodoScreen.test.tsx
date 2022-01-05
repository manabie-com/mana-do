import React from "react";
import ToDoPage from "pages/ToDoScreen";
import { fireEvent, render, screen } from "@testing-library/react";
import { Todo } from "models/todo";

const mockOnToggleAllTodo = jest.fn();
jest.mock("../../../service", () => {
  const { TodoStatus } = require("models");
  const todos: Todo[] = [
    {
      id: "huy123",
      content: "some tasks1",
      status: TodoStatus.ACTIVE,
      user_id: "huy1",
      created_date: new Date().toISOString(),
    },
    {
      id: "huy345",
      content: "some tasks2",
      status: TodoStatus.ACTIVE,
      user_id: "huy1",
      created_date: new Date().toISOString(),
    },
    {
      id: "huy567",
      content: "some tasks3",
      status: TodoStatus.ACTIVE,
      user_id: "huy1",
      created_date: new Date().toISOString(),
    },
  ];
  return {
    getTodos: () => Promise.resolve(todos),
    createTodo: (content: string) =>
      Promise.resolve({
        id: "231-f",
        content: content,
        status: TodoStatus.ACTIVE,
        user_id: "user1",
        created_date: new Date().toISOString(),
      }),
  };
});

describe("TodoPage component", () => {
  it("Should todo lenght is 3 when initialized", async () => {
    render(<ToDoPage />);
    const todoElements = await screen.findAllByTestId("todo-item");
    expect(todoElements.length).toBe(3);
  });
  describe("Add todo feature", () => {
    beforeEach(async () => {
      render(<ToDoPage />);
    });
    it("should not be add when input is empty", async () => {
      const inputElement = screen.getByPlaceholderText(/What need to be done/i);
      fireEvent.keyDown(inputElement, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
      const todoElements = await screen.findAllByTestId("todo-item");
      expect(todoElements.length).toBe(3);
    });
    it("should be add when input is not empty", async () => {
      const inputElement: HTMLInputElement =
        screen.getByPlaceholderText(/What need to be done/i);
      fireEvent.change(inputElement, { target: { value: "new todo" } });
      fireEvent.keyDown(inputElement, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
      expect(await screen.findByText("new todo")).toBeInTheDocument();
      const todoElements = await screen.findAllByTestId("todo-item");
      expect(todoElements.length).toBe(4);
      const inputElementThen: HTMLInputElement =
        await screen.findByPlaceholderText(/What need to be done/i);
      expect(inputElementThen.value).toBe("");
    });
  });
});
describe("trigger toggle all todos event when checkbox is clicked", () => {
  it("trigger toggle all todos event when checkbox is clicked", () => {
    render(<ToDoPage />);
    const checkBoxElement = screen.getByRole("checkbox");
    fireEvent.click(checkBoxElement);
    expect(mockOnToggleAllTodo).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAllTodo).toHaveBeenCalledWith(true);
  });
  it("trigger toggle all todos event when active todo is greater than 0", () => {
    render(<ToDoPage />);
    const checkBoxElement = screen.getByRole("checkbox");
    expect(checkBoxElement).not.toBeChecked();
    fireEvent.click(checkBoxElement);
    expect(mockOnToggleAllTodo).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAllTodo).toHaveBeenCalledWith(true);
  });
  it("trigger toggle all todos event when active todo is equal 0", () => {
    render(<ToDoPage />);
    const checkBoxElement = screen.getByRole("checkbox");
    expect(checkBoxElement).toBeChecked();
    fireEvent.click(checkBoxElement);
    expect(mockOnToggleAllTodo).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAllTodo).toHaveBeenCalledWith(false);
  });
});
