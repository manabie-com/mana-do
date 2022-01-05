import React from "react";
import { Todo as TodoItem } from "components";
import { PropsTodoItem } from "components/Todo/Todo";
import { Todo, TodoStatus } from "models/todo";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const mockTodo: Todo = {
  id: "123456",
  content: "work",
  status: TodoStatus.ACTIVE,
  user_id: "123567893341",
  created_date: new Date().toISOString(),
};
const mockOnUpdateTodoStatus = jest.fn();
const mockOnDeleteTodo = jest.fn();
const mockHandleEditContent = jest.fn();
const mockOnToggleEditTodo = jest.fn();
const mockonUpdateTodoContent = jest.fn();
const props: PropsTodoItem = {
  todo: mockTodo,
  index: 1,
  onUpdateTodoStatus: mockOnUpdateTodoStatus,
  onDeleteTodo: mockOnDeleteTodo,
  onUpdateTodoContent: mockonUpdateTodoContent,
};
describe("TodoItem component", () => {
  describe("initialized with mock props", () => {
    afterEach(cleanup);
    beforeEach(() => {
      render(<TodoItem {...props} />);
    });
    it("the component should not be edit mode", () => {
      expect(screen.queryByTestId("todo-view")).toBeInTheDocument();
      expect(screen.queryByTestId("todo-edit")).not.toBeInTheDocument();
    });
    it("the todo content should be displayed", () => {
      expect(screen.getByText(mockTodo.content)).toBeInTheDocument();
    });

    it("the checkbox should not be checked", () => {
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });
    it("trigger change status event to completed", () => {
      const statusCheckBox: HTMLInputElement = screen.getByRole("checkbox");
      fireEvent.click(statusCheckBox);
      expect(mockOnUpdateTodoStatus).toHaveBeenCalledTimes(1);
      expect(mockOnUpdateTodoStatus).toHaveBeenCalledWith(mockTodo.id, true);
    });
    it("trigger delete todo event when click button", () => {
      const deleteBtn: HTMLButtonElement = screen.getByRole("button");
      fireEvent.click(deleteBtn);
      expect(mockOnDeleteTodo).toHaveBeenCalledTimes(1);
      expect(mockOnDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
    });
  });
  describe("initialized with todo status is completed", () => {
    afterEach(cleanup);
    beforeEach(() => {
      const newProps = {
        ...props,
        todo: { ...props.todo, status: TodoStatus.COMPLETED },
      };
      render(<TodoItem {...newProps} />);
    });
    it("the checkbox should not be checked", () => {
      expect(screen.getByRole("checkbox")).toBeChecked();
    });
    it("trigger change status event to active", () => {
      const statusCheckBox: HTMLInputElement = screen.getByRole("checkbox");
      fireEvent.click(statusCheckBox);
      expect(mockOnUpdateTodoStatus).toHaveBeenCalledTimes(1);
      expect(mockOnUpdateTodoStatus).toHaveBeenCalledWith(mockTodo.id, false);
    });

    it("change to edit mode when double click", () => {
      const todoElement = screen.getByText(mockTodo.content);
      fireEvent.doubleClick(todoElement);
      expect(mockHandleEditContent).toHaveBeenCalledTimes(1);
      expect(mockHandleEditContent).toHaveBeenCalledWith();
    });
  });
  describe("initialized with edit mode", () => {
    afterEach(cleanup);
    beforeEach(() => {
      render(<TodoItem {...props} />);
    });
    it("the component should not be edit mode", () => {
      expect(screen.queryByTestId("todo-view")).toBeInTheDocument();
      expect(screen.queryByTestId("todo-edit")).not.toBeInTheDocument();
    });
    it("the edit input default value is the same with todo content", () => {
      const editElement: HTMLInputElement = screen.getByTestId("todo-edit");
      expect(editElement.value).toBe(mockTodo.content);
    });
    it("should not trigger edit event when the input is empty", () => {
      const editElement: HTMLInputElement = screen.getByTestId("todo-edit");
      fireEvent.change(editElement, { target: { value: "" } });
      fireEvent.keyDown(editElement, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
      expect(mockonUpdateTodoContent).toHaveBeenCalledTimes(0);
    });
    it("trigger edit event when press enter", () => {
      const editElement: HTMLInputElement = screen.getByTestId("todo-edit");
      fireEvent.change(editElement, { target: { value: "some task value" } });
      fireEvent.keyDown(editElement, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
      expect(mockonUpdateTodoContent).toHaveBeenCalledTimes(1);
      expect(mockonUpdateTodoContent).toHaveBeenCalledWith(
        mockTodo.id,
        "some tasks edited"
      );
      expect(mockOnToggleEditTodo).toHaveBeenCalledTimes(1);
    });
  });
});
