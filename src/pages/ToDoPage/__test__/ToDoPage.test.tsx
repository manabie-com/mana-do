import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import { ToDoPage } from "../ToDoPage";

describe("ToDoPage", () => {
  it("Should add Todo", async () => {
    render(<ToDoPage />);
    const inputAdd = screen.getByPlaceholderText("What need to be done?");
    userEvent.type(inputAdd, "Add Todo 1");
    fireEvent.keyDown(inputAdd, { key: "Enter", code: "Enter" });

    userEvent.type(inputAdd, "Add Todo 2");
    fireEvent.keyDown(inputAdd, { key: "Enter", code: "Enter" });

    userEvent.type(inputAdd, "Add Todo 3");
    fireEvent.keyDown(inputAdd, { key: "Enter", code: "Enter" });

    const todos = await screen.findAllByTestId("item-todo");
    expect(todos.length).toBe(3);
  });

  it("Should checked all Todo", async () => {
    render(<ToDoPage />);

    const checkedAll = await screen.findByTestId("label-todo-checked");

    userEvent.click(checkedAll);

    const textTodos = await screen.findAllByTestId("item-tod-span");

    textTodos.forEach((text) => {
      expect(text).toHaveStyle("text-decoration: line-through");
    });
  });

  it("Should delete one Todo", async () => {
    render(<ToDoPage />);

    await waitFor(() => {
      const btnDeletes = document.querySelectorAll(".item-todo__delete");
      userEvent.click(btnDeletes[0]);
      expect(btnDeletes.length).toBe(2);
    });
  });

  it("Should edit one Todo", async () => {
    render(<ToDoPage />);
    const todos = await screen.findAllByTestId("item-todo");

    await act(async () => {
      userEvent.dblClick(todos[0]);
    });

    await waitFor(() => {
      const inputEdit = document.querySelector(
        ".item-todo__input"
      ) as HTMLInputElement;

      userEvent.type(inputEdit, "Edited test");
      fireEvent.keyDown(inputEdit, { key: "Enter", code: "Enter" });
    });
    expect(screen.findByText(/edited test/i));
  });

  it("Should delete all todos", async () => {
    render(<ToDoPage />);

    const btnDeleteAll = await screen.findByText(/clear all todos/i);

    await act(async () => {
      userEvent.click(btnDeleteAll);
    });
    const todos = await screen.findAllByTestId("item-todo");
    expect(todos.length).toBe(1);
  });
});
