import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import Service from "service";
import TodoToolbar from ".";
import useFilterTodoFacade from "../facades/useFilterTodoFacade";
import useTodoFacade from "../facades/useTodoFacade";
import { CreateTodoDto, TodoStatus } from "../todo.models";

describe(`${TodoToolbar.name} Test Suite`, () => {
  beforeEach(async () => {
    await act(async () => {
      render(<TodoToolbar />);
    });
  });

  afterEach(cleanup);

  it("should not display toggle all todo checbox if todos length = 0", async () => {
    const todoStore = renderHook(() => useTodoFacade());

    const filterTodoStore = renderHook(() => useFilterTodoFacade());

    expect(todoStore.result.current.todos.length).toEqual(0);

    let hasAllTodos =
      filterTodoStore.result.current.showStatus === TodoStatus.ALL && todoStore.result.current.todos.length > 0;

    expect(hasAllTodos).not.toBeTruthy();

    expect(screen.queryByTestId("toggle-all-checkbox")).toBeNull();
  });

  it("should display toggle all todo checbox if todos length > 0", async () => {
    const todoStore = renderHook(() => useTodoFacade());

    const filterTodoStore = renderHook(() => useFilterTodoFacade());

    const createTodoDtos: CreateTodoDto[] = [
      {
        content: "Should pass this test 1",
      },
      {
        content: "Should pass this test 2",
      },
      {
        content: "Should pass this test 3",
      },
      {
        content: "Should pass this test 4",
      },
    ];

    await act(async () => {
      for await (const createTodoDto of createTodoDtos) {
        await Service.createTodo(createTodoDto);
      }

      todoStore.result.current.fetchTodos();

      await todoStore.waitForValueToChange(() => todoStore.result.current.todos);
    });

    expect(todoStore.result.current.todos.length).toEqual(4);

    let hasFilteredTodos =
      todoStore.result.current.todos.filter((todo) => todo.status === filterTodoStore.result.current.showStatus)
        .length > 0;

    let hasAllTodos =
      filterTodoStore.result.current.showStatus === TodoStatus.ALL && todoStore.result.current.todos.length > 0;

    expect(hasFilteredTodos).not.toBeTruthy();

    expect(hasAllTodos).toBeTruthy();

    const toggleAllCheckbox = screen.getByTestId("toggle-all-checkbox");

    expect(toggleAllCheckbox).toBeInTheDocument();
  });

  it("should display all toolbar button correctly", () => {
    const todoToolbarSelectAll = screen.getByTestId("todo-toolbar-select-all");
    const todoToolbarSelectActive = screen.getByTestId("todo-toolbar-select-active");
    const todoToolbarSelectCompleted = screen.getByTestId("todo-toolbar-select-completed");
    const todoToolbarDeleteAll = screen.getByTestId("todo-toolbar-delete-all");

    expect(todoToolbarSelectAll).toBeInTheDocument();
    expect(todoToolbarSelectActive).toBeInTheDocument();
    expect(todoToolbarSelectCompleted).toBeInTheDocument();
    expect(todoToolbarDeleteAll).toBeInTheDocument();
  });
});
