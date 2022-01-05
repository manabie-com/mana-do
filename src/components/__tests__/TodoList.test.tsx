import { fireEvent, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { TodoStatus } from "../../models/todo";
import { TodoList } from "../TodoList";

const initialTodos = [
  {
    id: "1",
    content: "New todo 1",
    user_id: "newUser",
    created_date: new Date().toUTCString(),
    status: TodoStatus.ACTIVE,
  },
  {
    id: "2",
    content: "New todo 2",
    user_id: "newUser",
    created_date: new Date().toUTCString(),
    status: TodoStatus.ACTIVE,
  },
];

describe("TodoList", () => {
  test("should list all todos", () => {
    const { getAllByText } = render(
      <TodoList
        todos={initialTodos}
        showing={TodoStatus.ACTIVE}
        dispatch={() => {}}
        onRemove={()=>{}}
      />
    );
    const todos = getAllByText(/new todo/i);
    expect(todos.length).toBe(2);
  });

  test("should able to remove a todo", () => {
    const onRemoveMock = jest.fn()
    const { getByText } = render(
      <TodoList
        todos={initialTodos}
        showing={TodoStatus.ACTIVE}
        dispatch={() => {}}
        onRemove={onRemoveMock}
        
      />
    );

    const todo1 = getByText(/new todo 1/i);
    const removeButton = todo1.parentNode?.querySelector("button");
    if (removeButton) {
      fireEvent.click(removeButton);
      expect(onRemoveMock).toBeCalledTimes(1)
      expect(onRemoveMock).toBeCalledWith('1')
    }
  });
});
