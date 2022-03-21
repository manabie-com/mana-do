import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import shortid from "shortid";
import TodoItem, { TodoItemProps } from ".";
import { TodoStatus } from "../todo.models";

const id = shortid();

const props: TodoItemProps = {
  testId: id,
  todo: {
    id,
    user_id: "hh1296",
    content: "Test todo item",
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString(),
  },
};

describe(`${TodoItem.name} Test Suite`, () => {
  let todoEditItemInput: HTMLInputElement;
  let todoItemCheckbox: HTMLInputElement;
  let todoItemSpan: HTMLSpanElement;
  let todoItemTime: HTMLTimeElement;

  describe("With Active status", () => {
    beforeEach(async () => {
      await act(async () => {
        render(<TodoItem {...props} />);
      });

      todoItemCheckbox = screen.getByTestId("todo-item-checkbox");
      todoItemSpan = screen.getByTestId("todo-item");
      todoItemTime = screen.getByTestId("todo-item-time");
    });

    afterEach(() => {
      cleanup();
    });

    it("should display correctly", () => {
      expect(todoItemSpan).toBeInTheDocument();
      expect(todoItemTime).toBeInTheDocument();
      expect(todoItemCheckbox).toBeInTheDocument();

      expect(todoItemSpan).toHaveTextContent(props.todo.content);
      expect(todoItemTime).toHaveTextContent(new Date(props.todo.updated_date).toLocaleString());
      expect(todoItemCheckbox).not.toBeChecked();
    });

    it("should show edit todo input on double click", async () => {
      await act(async () => {
        fireEvent.doubleClick(todoItemSpan);
      });

      todoEditItemInput = screen.getByTestId("edit-todo-input");

      expect(todoEditItemInput).toBeInTheDocument();
    });
  });

  describe("With Completed status", () => {
    beforeEach(() => {
      props.todo.status = TodoStatus.COMPLETED;
      render(<TodoItem {...props} />);

      todoItemCheckbox = screen.getByTestId("todo-item-checkbox");
      todoItemSpan = screen.getByTestId("todo-item");
      todoItemTime = screen.getByTestId("todo-item-time");
    });

    afterEach(() => {
      cleanup();
    });

    it("should display correctly", () => {
      expect(todoItemSpan).toBeInTheDocument();
      expect(todoItemTime).toBeInTheDocument();
      expect(todoItemCheckbox).toBeInTheDocument();

      expect(todoItemSpan).toHaveTextContent(props.todo.content);
      expect(todoItemSpan).toHaveAttribute("todo-status", TodoStatus.COMPLETED);
      expect(todoItemTime).toHaveTextContent(new Date(props.todo.updated_date).toLocaleString());
      expect(todoItemCheckbox).toBeChecked();
    });
  });
});
