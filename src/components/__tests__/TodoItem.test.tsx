import { fireEvent, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { TodoStatus } from "../../models/todo";
import { TodoItem } from "../TodoItem";

const todoItem = {
  id: "1",
  content: "New todo 1",
  user_id: "newUser",
  created_date: new Date().toUTCString(),
  status: TodoStatus.ACTIVE,
};

describe("TodoItem", () => {
  test("should show todo item successfully", () => {
    const rr = render(
      <TodoItem
        todo={todoItem}
        onRemove={() => {}}
        onUpdate={() => {}}
        onEdit={() => {}}
      />
    );
    expect(rr.getByRole("checkbox")).not.toBeChecked();
    expect(rr.getByText(/new todo 1/i)).toBeInTheDocument();
  });

  test("should checked the checkbox if status is COMPLETED", () => {
    const completedTodo = { ...todoItem, status: TodoStatus.COMPLETED };
    const rr = render(
      <TodoItem
        todo={completedTodo}
        onRemove={() => {}}
        onUpdate={() => {}}
        onEdit={() => {}}
      />
    );
    expect(rr.getByRole("checkbox")).toBeChecked();
  });

  test("should able to delete", () => {
    const deleteCallback = jest.fn();
    const rr = render(
      <TodoItem
        todo={todoItem}
        onRemove={deleteCallback}
        onUpdate={() => {}}
        onEdit={() => {}}
      />
    );
    fireEvent.click(rr.getByText("X"));
    expect(deleteCallback).toBeCalledTimes(1);
    expect(deleteCallback).toBeCalledWith(todoItem.id);
  });

  xtest("should able to update", async () => {
    const updateCallback = jest.fn();
    const rr = render(
      <TodoItem
        todo={todoItem}
        onRemove={() => {}}
        onUpdate={updateCallback}
        onEdit={() => {}}
      />
    );
    fireEvent.doubleClick(rr.getByTestId("ToDo__item"));
    const input = await rr.findByDisplayValue(todoItem.content);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "changed" } });
    expect(rr.findByText("changed")).toBeInTheDocument();
  });
});
