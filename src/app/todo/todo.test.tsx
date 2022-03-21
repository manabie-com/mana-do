import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import Service from "service";
import ToDo from ".";
import useTodoFacade from "./facades/useTodoFacade";
import { CreateTodoDto, Todo, TodoStatus } from "./todo.models";

describe(`${ToDo.name} Test Suite`, () => {
  let isAllCompleted: boolean;
  let inputEle: HTMLElement;
  let todoList: HTMLDivElement;
  let todoItemCheckbox: HTMLInputElement | null = null;
  let todoItemSpan: HTMLSpanElement | null = null;
  let todoEditItemInput: HTMLInputElement | null = null;

  beforeEach(async () => {
    await act(async () => {
      render(<ToDo />);
    });

    inputEle = screen.getByTestId("create-todo-input");
  });

  afterEach(() => {
    cleanup();
  });

  it("should add new todo after pressing Enter if input have value", async () => {
    const { result, waitForValueToChange } = renderHook(() => useTodoFacade());

    const mockContent = "Should pass this test";

    await act(async () => {
      fireEvent.change(inputEle, { target: { value: mockContent } });

      expect(inputEle).toHaveValue(mockContent);

      fireEvent.keyDown(inputEle, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });

      await waitForValueToChange(() => result.current.todos);
    });

    expect(result.current.todos.length).toEqual(1);

    expect(inputEle).toHaveValue("");
  });

  it("should not add new todo after pressing Enter if input does not have value", async () => {
    const { result } = renderHook(() => useTodoFacade());

    expect(inputEle).toHaveValue("");

    fireEvent.keyDown(inputEle, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(result.current.todos.length).toEqual(1);
  });

  it("should add right amount of todo", async () => {
    const todoStore = renderHook(() => useTodoFacade());

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

    // Feed store for later test
    await act(async () => {
      for await (const createTodoDto of createTodoDtos) {
        await Service.createTodo(createTodoDto);
      }

      todoStore.result.current.fetchTodos();

      await todoStore.waitForValueToChange(() => todoStore.result.current.todos);
    });

    expect(todoStore.result.current.todos.length).toEqual(5);
  });

  it("should edit item", async () => {
    const todoStore = renderHook(() => useTodoFacade());

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(5);

    const testedTodoItem = todoStore.result.current.todos[1];

    expect(testedTodoItem.status).toEqual(TodoStatus.ACTIVE);

    const testItem = screen.getByTestId(testedTodoItem.id);

    todoItemSpan = testItem.querySelector("span[data-testid='todo-item']");

    expect(todoItemSpan).toBeInTheDocument();

    expect(todoItemSpan).toHaveTextContent(testedTodoItem.content);

    await act(async () => {
      if (todoItemSpan) fireEvent.doubleClick(todoItemSpan);
    });

    todoEditItemInput = testItem.querySelector("input[data-testid='edit-todo-input']");

    expect(todoEditItemInput).toBeInTheDocument();

    const changedContent = "Content should change";

    await act(async () => {
      if (todoEditItemInput) fireEvent.change(todoEditItemInput, { target: { value: changedContent } });
    });

    expect(todoEditItemInput).toHaveValue(changedContent);

    await act(async () => {
      if (todoEditItemInput) {
        fireEvent.keyDown(todoEditItemInput, {
          key: "Enter",
          code: "Enter",
          charCode: 13,
        });
      }
    });

    todoEditItemInput = testItem.querySelector("input[data-testid='edit-todo-input']");

    todoItemSpan = testItem.querySelector("span[data-testid='todo-item']");

    expect(todoEditItemInput).not.toBeTruthy();

    expect(todoItemSpan).toHaveTextContent(changedContent);
  });

  it("should checked checkbox when change active item to completed", async () => {
    const todoStore = renderHook(() => useTodoFacade());

    let testedTodoItem: Todo;

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(5);

    testedTodoItem = todoStore.result.current.todos[3];

    expect(testedTodoItem.status).toEqual(TodoStatus.ACTIVE);

    const testItem = screen.getByTestId(testedTodoItem.id);

    todoItemCheckbox = testItem.querySelector("input[data-testid='todo-item-checkbox']");

    expect(todoItemCheckbox).toBeInTheDocument();

    expect(todoItemCheckbox).not.toBeChecked();

    await act(async () => {
      if (todoItemCheckbox) fireEvent.click(todoItemCheckbox);
    });

    testedTodoItem = todoStore.result.current.todos[3];

    expect(testedTodoItem.status).toEqual(TodoStatus.COMPLETED);

    todoItemCheckbox = testItem.querySelector("input[data-testid='todo-item-checkbox']");

    expect(todoItemCheckbox).toBeChecked();
  });

  it("should unchecked checkbox when change completed item to active", async () => {
    let testedTodoItem: Todo;

    const todoStore = renderHook(() => useTodoFacade());

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(5);

    testedTodoItem = todoStore.result.current.todos[3];

    expect(testedTodoItem.status).toEqual(TodoStatus.COMPLETED);

    const testItem = screen.getByTestId(testedTodoItem.id);

    todoItemCheckbox = testItem.querySelector("input[data-testid='todo-item-checkbox']");

    expect(todoItemCheckbox).toBeChecked();

    await act(async () => {
      if (todoItemCheckbox) fireEvent.click(todoItemCheckbox);
    });

    testedTodoItem = todoStore.result.current.todos[3];

    expect(testedTodoItem.status).toEqual(TodoStatus.ACTIVE);

    todoItemCheckbox = testItem.querySelector("input[data-testid='todo-item-checkbox']");

    expect(todoItemCheckbox).not.toBeChecked();
  });

  it("should delete item", async () => {
    const todoStore = renderHook(() => useTodoFacade());

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(5);

    const testedTodoItem = todoStore.result.current.todos[1];

    expect(testedTodoItem.status).toEqual(TodoStatus.ACTIVE);

    const testItem = screen.getByTestId(testedTodoItem.id);

    const todoItemDeleteButton = testItem.querySelector("img[data-testid='delete-todo-item-icon']");

    expect(todoItemDeleteButton).toBeInTheDocument();

    await act(async () => {
      if (todoItemDeleteButton) fireEvent.click(todoItemDeleteButton);
    });

    expect(todoStore.result.current.todos.length).toEqual(4);
  });

  it("should toggle all work correctly", async () => {
    const todoStore = renderHook(() => useTodoFacade());

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(4);

    const toggleAllCheckbox = screen.getByTestId("toggle-all-checkbox");

    expect(toggleAllCheckbox).toBeInTheDocument();

    expect(toggleAllCheckbox).not.toBeChecked();

    await act(async () => {
      fireEvent.click(toggleAllCheckbox);
    });

    isAllCompleted = todoStore.result.current.todos.every((todo) => todo.status === TodoStatus.COMPLETED);

    expect(isAllCompleted).toBeTruthy();

    await act(async () => {
      fireEvent.click(toggleAllCheckbox);
    });

    isAllCompleted = todoStore.result.current.todos.every((todo) => todo.status === TodoStatus.COMPLETED);

    expect(isAllCompleted).not.toBeTruthy();
  });

  it("should select filter show fitlered status todo item only", async () => {
    const todoStore = renderHook(() => useTodoFacade());

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(4);

    const testItem1 = screen.getByTestId(todoStore.result.current.todos[1].id);

    const todoItemCheckbox1 = testItem1.querySelector("input[data-testid='todo-item-checkbox']");

    await act(async () => {
      if (todoItemCheckbox1) fireEvent.click(todoItemCheckbox1);
    });

    const testItem2 = screen.getByTestId(todoStore.result.current.todos[3].id);

    const todoItemCheckbox2 = testItem2.querySelector("input[data-testid='todo-item-checkbox']");

    await act(async () => {
      if (todoItemCheckbox2) fireEvent.click(todoItemCheckbox2);
    });

    const actualAllAmount = todoStore.result.current.todos.length;

    const actualActiveAmount = todoStore.result.current.todos.filter(
      (todo) => todo.status === TodoStatus.ACTIVE
    ).length;

    const actualCompletedAmount = actualAllAmount - actualActiveAmount;

    // Test Active
    const activeFilterButton = screen.getByTestId("todo-toolbar-select-active");

    expect(activeFilterButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(activeFilterButton);
    });

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(actualActiveAmount);

    // Test Completed
    const completedFilterButton = screen.getByTestId("todo-toolbar-select-completed");

    expect(completedFilterButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(completedFilterButton);
    });

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(actualCompletedAmount);

    // Test All
    const allFilterButton = screen.getByTestId("todo-toolbar-select-all");

    expect(allFilterButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(allFilterButton);
    });

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(actualAllAmount);
  });

  it("should delete all item", async () => {
    const todoStore = renderHook(() => useTodoFacade());

    todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toEqual(4);

    const deleteAllButton = screen.getByTestId("todo-toolbar-delete-all");

    expect(deleteAllButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(deleteAllButton);
    });

    expect(todoStore.result.current.todos.length).toEqual(0);
  });
});
