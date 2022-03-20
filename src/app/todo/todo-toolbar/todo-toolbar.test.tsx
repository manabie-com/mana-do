import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import Service from "service";
import TodoToolbar, { TodoToolbarProps } from ".";
import useTodoStore from "../store/useTodoStore";
import { CreateTodoDto, TodoStatus, ToggleAllTodosDto } from "../todo.models";

const props: TodoToolbarProps = {
  toggleAllTodos: jest.fn(),
  deleteAllTodos: jest.fn(),
  setShowStatus: jest.fn(),
};

describe(`${TodoToolbar.name} Test Suite`, () => {
  it("fetch todos from api", async () => {
    const { result, waitForValueToChange } = renderHook(() => useTodoStore((state) => state));

    await act(async () => {
      const createTodoDto1: CreateTodoDto = {
        content: "Should pass this test 1",
      };

      const createTodoDto2: CreateTodoDto = {
        content: "Should pass this test 2",
      };

      const createTodoDto3: CreateTodoDto = {
        content: "Should pass this test 3",
      };

      const createTodoDto4: CreateTodoDto = {
        content: "Should pass this test 4",
      };

      await Service.createTodo(createTodoDto1);
      await Service.createTodo(createTodoDto2);
      await Service.createTodo(createTodoDto3);
      await Service.createTodo(createTodoDto4);

      result.current.fetchTodos();

      await waitForValueToChange(() => result.current.todos);
    });
  });

  describe("Todo Toolbar Select Status", () => {
    beforeEach(() => {
      render(<TodoToolbar {...props} />);
    });

    afterEach(cleanup);

    it("should call toggleAllTodos", async () => {
      const { result, waitForValueToChange } = renderHook(() => useTodoStore((state) => state));
      const mockToggleAllTodos = jest.spyOn(result.current, "toggleAllTodos");

      let isAllComplete = result.current.todos.every((todo) => todo.status === TodoStatus.COMPLETED);
      const toggleAllCheckbox = screen.getByTestId("toggle-all-checkbox");
      const toggleAllTodosCompletedDto: ToggleAllTodosDto = {
        status: TodoStatus.COMPLETED,
      };
      const toggleAllTodosActiveDto: ToggleAllTodosDto = {
        status: TodoStatus.ACTIVE,
      };

      expect(isAllComplete).not.toBeTruthy();
      fireEvent.click(toggleAllCheckbox);
      expect(props.toggleAllTodos).toHaveBeenCalledTimes(1);
      expect(props.toggleAllTodos).toHaveBeenCalledWith(toggleAllTodosCompletedDto);

      await act(async () => {
        result.current.toggleAllTodos(toggleAllTodosCompletedDto);

        expect(mockToggleAllTodos).toHaveBeenCalledTimes(1);

        expect(mockToggleAllTodos).toHaveBeenCalledWith(toggleAllTodosCompletedDto);

        await waitForValueToChange(() => result.current.todos);
      });

      isAllComplete = result.current.todos.every((todo) => todo.status === TodoStatus.COMPLETED);

      expect(isAllComplete).toBeTruthy();
      fireEvent.click(toggleAllCheckbox);
      expect(props.toggleAllTodos).toHaveBeenCalledTimes(2);
      expect(props.toggleAllTodos).toHaveBeenCalledWith(toggleAllTodosActiveDto);

      await act(async () => {
        result.current.toggleAllTodos(toggleAllTodosActiveDto);

        expect(mockToggleAllTodos).toHaveBeenCalledTimes(2);

        expect(mockToggleAllTodos).toHaveBeenCalledWith(toggleAllTodosActiveDto);

        await waitForValueToChange(() => result.current.todos);
      });

      isAllComplete = result.current.todos.every((todo) => todo.status === TodoStatus.COMPLETED);

      expect(isAllComplete).not.toBeTruthy();
    });

    it("should call setShowStatus with 'ALL' as param", () => {
      const todoToolbarSelectAll = screen.getByTestId("todo-toolbar-select-all");
      fireEvent.click(todoToolbarSelectAll);

      expect(props.setShowStatus).toHaveBeenCalledTimes(1);
      expect(props.setShowStatus).toHaveBeenCalledWith(TodoStatus.ALL);
    });

    it("should call setShowStatus with 'ACTIVE' as param", () => {
      const todoToolbarSelectActive = screen.getByTestId("todo-toolbar-select-active");
      fireEvent.click(todoToolbarSelectActive);

      expect(props.setShowStatus).toHaveBeenCalledTimes(1);
      expect(props.setShowStatus).toHaveBeenCalledWith(TodoStatus.ACTIVE);
    });

    it("should call setShowStatus with 'COMPLETED' as param", () => {
      const todoToolbarSelectCompleted = screen.getByTestId("todo-toolbar-select-completed");
      fireEvent.click(todoToolbarSelectCompleted);

      expect(props.setShowStatus).toHaveBeenCalledTimes(1);
      expect(props.setShowStatus).toHaveBeenCalledWith(TodoStatus.COMPLETED);
    });

    it("should call deleteAllTodos", () => {
      const todoToolbarDeleteAll = screen.getByTestId("todo-toolbar-delete-all");
      fireEvent.click(todoToolbarDeleteAll);

      expect(props.deleteAllTodos).toHaveBeenCalledTimes(1);
    });
  });
});
