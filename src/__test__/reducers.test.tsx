import * as React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import {
  createTodo,
  deleteTodo,
  setTodos,
  updateTodoContent,
  updateTodoStatus,
} from "../store/actions/todoActions";
import { mockDB } from "./mockData";
import { fetchDB } from "./utils";
import { Todo, TodoStatus } from "../models/todo";
import { MANADO_DB } from "../constants";
import { TestComponentProps } from "./TestComponent";

import TodoProvider from "../store/contexts/todoContext";
import TestComponent from "./TestComponent";

// ----------------------------------------------------------------------

// Wraps the test component with the Provider to use the context API.
// Will spreads the data arg to test component props.
function CustomRender(data: TestComponentProps) {
  return (
    <TodoProvider>
      <TestComponent {...data} />
    </TodoProvider>
  );
}

// ----------------------------------------------------------------------

describe("Todos test", () => {
  // Setup the localstorage database
  beforeAll(() => {
    localStorage.setItem(MANADO_DB, JSON.stringify(mockDB));
  });

  // Create todo test
  it("Should create 1 todo", () => {
    const expectedTodo = {
      content: "New Todo",
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: "123456",
      user_id: "firstUser",
    } as Todo;
    const expectedTodoId = /123456/i;

    render(
      CustomRender({
        action: createTodo(expectedTodo),
      })
    );

    const todoID = screen.getByText(expectedTodoId);
    expect(todoID).toBeInTheDocument();
  });

  // Get all todos test
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

  // Update todo status test
  it("Should update expected todo status", () => {
    const database = fetchDB();
    const expectedTodoId = /RmrMgo8gH/i;
    render(
      CustomRender({
        preData: database.todos, // Need to set todos to state before updating
        action: updateTodoStatus("RmrMgo8gH", true),
      })
    );

    const todoID = screen.getByText(expectedTodoId);

    expect(todoID.textContent.includes("COMPLETED")).toBeTruthy(); // The expected status is updated based on the todo ID
  });

  // Update todo content test
  it("Should update expected todo content", () => {
    const database = fetchDB();
    const expectedTodoId = /RmrMgo8gH/i;
    const expectedContent = "Edited todo";

    render(
      CustomRender({
        preData: database.todos, // Need to set todos to state before updating
        action: updateTodoContent("RmrMgo8gH", expectedContent),
      })
    );

    const updatedTodoString = screen.getByText(expectedTodoId);

    expect(
      updatedTodoString.textContent.includes(expectedContent)
    ).toBeTruthy(); // The expected updated content is available/updated based on the expected todo ID
  });

  // Remove todo test
  it("Should remove expected todo", () => {
    const database = fetchDB();
    const expectedTodoId = /RmrMgo8gH/i;

    render(
      CustomRender({
        preData: database.todos, // Need to set todos to state before deleting
        action: deleteTodo("RmrMgo8gH"),
      })
    );

    try {
      screen.getByText(expectedTodoId); // Throw error when ID is not on the screen
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  afterAll(() => cleanup());
});
