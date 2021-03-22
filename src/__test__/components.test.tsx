import * as React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { mockDB } from "./mockData";
import { AUTH_TOKEN, MANADO_DB } from "../constants";
import {
  createTodo,
  deleteTodo,
  setTodos,
  updateTodoContent,
  updateTodoStatus,
} from "../store/actions/todoActions";
import { TestComponentProps } from "./TestComponent";

import TodoProvider from "../store/contexts/todoContext";
import TestComponent from "./TestComponent";
import { fetchDB } from "./utils";
import { Todo, TodoStatus } from "../models/todo";

localStorage.setItem(MANADO_DB, JSON.stringify(mockDB));
localStorage.setItem(AUTH_TOKEN, "testabc.xyz.ahkfirstUser");

// ----------------------------------------------------------------------

function CustomRender(data: TestComponentProps) {
  return (
    <TodoProvider>
      <TestComponent {...data} />
    </TodoProvider>
  );
}

// ----------------------------------------------------------------------

describe("Todo test", () => {
  afterAll(() => cleanup());

  it("Should create 1 todo", () => {
    const expectedTodo = {
      content: "New Todo",
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: "123456",
      user_id: "firstUser",
    } as Todo;

    render(
      CustomRender({
        action: createTodo(expectedTodo),
      })
    );

    const todoID = screen.getByText(/123456/i);
    expect(todoID).toBeInTheDocument();
  });

  it("Should render all expected todos", () => {
    const database = fetchDB();
    const expectedTodoIds = [/RmrMgo8gH/i, /zxczxczxc/i];

    render(
      CustomRender({
        action: setTodos(database.todos),
      })
    );

    expectedTodoIds.forEach((id) => {
      const todoID = screen.getByText(id);
      expect(todoID).toBeInTheDocument();
    });
  });

  it("Should update expected todo status", () => {
    const database = fetchDB();
    render(
      CustomRender({
        preData: database.todos, // Need to set todos to state before updating
        action: updateTodoStatus("RmrMgo8gH", true),
      })
    );

    const todoID = screen.getByText(/RmrMgo8gH/i);

    expect(todoID.textContent.includes("COMPLETED")).toBeTruthy();
  });

  it("Should update expected todo content", () => {
    const database = fetchDB();
    render(
      CustomRender({
        preData: database.todos, // Need to set todos to state before updating
        action: updateTodoContent("RmrMgo8gH", "Edited todo"),
      })
    );

    const updatedTodoString = screen.getByText(/RmrMgo8gH/i);

    expect(updatedTodoString.textContent.includes("Edited todo")).toBeTruthy();
  });

  it("Should remove expected todo", () => {
    const database = fetchDB();

    render(
      CustomRender({
        preData: database.todos, // Need to set todos to state before deleting
        action: deleteTodo("RmrMgo8gH"),
      })
    );

    try {
      screen.getByText(/RmrMgo8gH/i);
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });
});
