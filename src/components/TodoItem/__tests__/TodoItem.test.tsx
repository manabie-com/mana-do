import React from "react";
import { expect, test, describe } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem, { TodoItemProps } from "../index";
import shortid from "shortid";
import { Todo, TodoStatus } from "models/todo";
import userEvent from "@testing-library/user-event";

const mockedOnDelete = jest.fn();
const mockedOnUpdate = jest.fn();
const mockedOnUpdateStatus = jest.fn();

const todo: Todo = {
  id: shortid(),
  user_id: "1",
  created_date: new Date().toISOString(),
  content: "Feed the dog",
  status: TodoStatus.ACTIVE,
};

const props: TodoItemProps = {
  todo: todo,
  onUpdateStatus: mockedOnUpdateStatus,
  onUpdate: mockedOnUpdate,
  onDelete: mockedOnDelete,
};

describe("TodoItem Snapshots", () => {
  test("should render TodoItem snapshot", () => {
    const { container } = render(<TodoItem {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("TodoItem functions", () => {
  test("should render corrent content of todo", () => {
    render(<TodoItem {...props} />);
    const contentElement = screen.getByText("Feed the dog");
    expect(contentElement).toBeDefined();
  });

  test("should render edit from when double click", () => {
    render(<TodoItem {...props} />);
    const todoItemElement = screen.getByTestId("todo-item");
    fireEvent.doubleClick(todoItemElement);
    const editFormElement = screen.queryByTestId("todo-form");
    expect(editFormElement).not.toBeNull();
  });

  test("should fire event onDelete when click delete button", () => {
    render(<TodoItem {...props} />);
    const todoItemElement = screen.getByTestId("btn-delete");
    fireEvent.click(todoItemElement);
    expect(mockedOnDelete).toBeCalled();
  });

  test("should fire event onUpdate when press Enter in edit form", () => {
    render(<TodoItem {...props} />);
    const todoItemElement = screen.getByTestId("todo-item");
    fireEvent.doubleClick(todoItemElement);
    const editInputElement = screen.getByRole("textbox");
    fireEvent.keyDown(editInputElement, { key: "Enter" });
    expect(mockedOnUpdate).toBeCalled();
  });

  test("should not render edit from when press Enter in edit form", () => {
    render(<TodoItem {...props} />);
    const todoItemElement = screen.getByTestId("todo-item");
    fireEvent.doubleClick(todoItemElement);
    const editInputElement = screen.getByRole("textbox");
    fireEvent.keyDown(editInputElement, { key: "Enter" });
    const editFormElement = screen.queryByTestId("todo-form");
    expect(editFormElement).toBeNull();
  });

  test("should fire event onUpdateStatus when tick the checkbox", () => {
    render(<TodoItem {...props} />);
    const checkboxElement = screen.getByRole("checkbox");
    fireEvent.click(checkboxElement);
    expect(mockedOnUpdateStatus).toBeCalled();
  });
});
