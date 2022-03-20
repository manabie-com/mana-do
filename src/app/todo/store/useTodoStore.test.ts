import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { CreateTodoDto, DeleteTodoDto, TodoStatus, ToggleAllTodosDto, UpdateTodoDto } from "app/todo/todo.models";
import Service from "service";
import useTodoStore from "./useTodoStore";

describe(`useTodoStore Test Suite`, () => {
  it(`Create Todo`, async () => {
    const { result, waitForValueToChange } = renderHook(() => useTodoStore((state) => state));

    const mockCreateTodo = jest.spyOn(result.current, "createTodo");

    await act(async () => {
      const createTodoDto: CreateTodoDto = {
        content: "Should pass this test 1",
      };

      result.current.createTodo(createTodoDto);

      expect(mockCreateTodo).toHaveBeenCalledTimes(1);

      expect(mockCreateTodo).toHaveBeenCalledWith(createTodoDto);

      await waitForValueToChange(() => result.current.todos);

      expect(result.current.todos.length).toEqual(1);
    });
  });

  it(`Fetch Todos`, async () => {
    const { result, waitForValueToChange } = renderHook(() => useTodoStore((state) => state));
    const mockFetchTodos = jest.spyOn(result.current, "fetchTodos");

    await act(async () => {
      const createTodoDto2: CreateTodoDto = {
        content: "Should pass this test 2",
      };

      const createTodoDto3: CreateTodoDto = {
        content: "Should pass this test 3",
      };

      const createTodoDto4: CreateTodoDto = {
        content: "Should pass this test 4",
      };

      await Service.createTodo(createTodoDto2);
      await Service.createTodo(createTodoDto3);
      await Service.createTodo(createTodoDto4);

      result.current.fetchTodos();

      expect(mockFetchTodos).toHaveBeenCalledTimes(1);

      await waitForValueToChange(() => result.current.todos);

      expect(result.current.todos.length).toEqual(4);
    });
  });

  it(`Update Todo`, async () => {
    const { result, waitForValueToChange } = renderHook(() => useTodoStore((state) => state));
    const mockUpdateTodo = jest.spyOn(result.current, "updateTodo");

    await act(async () => {
      const updateTodoDto: UpdateTodoDto = {
        id: result.current.todos[1].id,
        content: "Should pass this test 2 - updated",
      };

      result.current.updateTodo(updateTodoDto);

      expect(mockUpdateTodo).toHaveBeenCalledTimes(1);

      expect(mockUpdateTodo).toHaveBeenCalledWith(updateTodoDto);

      await waitForValueToChange(() => result.current.todos);

      expect(result.current.todos[1].content).toEqual("Should pass this test 2 - updated");
    });

    await act(async () => {
      const updateTodoDto: UpdateTodoDto = {
        id: result.current.todos[1].id,
        status: TodoStatus.COMPLETED,
      };

      expect(result.current.todos[1].status).toEqual(TodoStatus.ACTIVE);

      result.current.updateTodo(updateTodoDto);

      expect(mockUpdateTodo).toHaveBeenCalledTimes(2);

      expect(mockUpdateTodo).toHaveBeenCalledWith(updateTodoDto);

      await waitForValueToChange(() => result.current.todos);

      expect(result.current.todos[1].status).toEqual(TodoStatus.COMPLETED);
    });
  });

  it(`Toggle All Todos`, async () => {
    const { result, waitForValueToChange } = renderHook(() => useTodoStore((state) => state));
    const mockToggleAllTodos = jest.spyOn(result.current, "toggleAllTodos");

    await act(async () => {
      expect(result.current.todos.filter((todo) => todo.status === TodoStatus.COMPLETED).length).toEqual(1);

      expect(result.current.todos.filter((todo) => todo.status === TodoStatus.ACTIVE).length).toEqual(3);

      const toggleAllTodosCompletedDto: ToggleAllTodosDto = {
        status: TodoStatus.COMPLETED,
      };

      result.current.toggleAllTodos(toggleAllTodosCompletedDto);

      expect(mockToggleAllTodos).toHaveBeenCalledTimes(1);

      expect(mockToggleAllTodos).toHaveBeenCalledWith(toggleAllTodosCompletedDto);

      await waitForValueToChange(() => result.current.todos);

      expect(result.current.todos.filter((todo) => todo.status === TodoStatus.COMPLETED).length).toEqual(4);

      expect(result.current.todos.filter((todo) => todo.status === TodoStatus.ACTIVE).length).toEqual(0);

      const toggleAllTodosActiveDto: ToggleAllTodosDto = {
        status: TodoStatus.ACTIVE,
      };

      result.current.toggleAllTodos(toggleAllTodosActiveDto);

      expect(mockToggleAllTodos).toHaveBeenCalledTimes(2);

      expect(mockToggleAllTodos).toHaveBeenCalledWith(toggleAllTodosActiveDto);

      await waitForValueToChange(() => result.current.todos);

      expect(result.current.todos.filter((todo) => todo.status === TodoStatus.COMPLETED).length).toEqual(0);

      expect(result.current.todos.filter((todo) => todo.status === TodoStatus.ACTIVE).length).toEqual(4);
    });
  });

  it(`Delete Todo`, async () => {
    const { result, waitForValueToChange } = renderHook(() => useTodoStore((state) => state));

    const mockDeleteTodo = jest.spyOn(result.current, "deleteTodo");

    await act(async () => {
      const deleteTodoId = result.current.todos[1].id;

      const deleteTodoDto: DeleteTodoDto = {
        id: deleteTodoId,
      };

      result.current.deleteTodo(deleteTodoDto);

      expect(mockDeleteTodo).toHaveBeenCalledTimes(1);

      expect(mockDeleteTodo).toHaveBeenCalledWith(deleteTodoDto);

      await waitForValueToChange(() => result.current.todos);

      expect(result.current.todos.length).toEqual(3);

      expect(result.current.todos.findIndex((todo) => todo.id === deleteTodoId)).toEqual(-1);
    });
  });

  it("Delete All Todos", async () => {
    const { result, waitForValueToChange } = renderHook(() => useTodoStore((state) => state));

    const mockDeleteAllTodos = jest.spyOn(result.current, "deleteAllTodos");

    await act(async () => {
      result.current.deleteAllTodos();

      expect(mockDeleteAllTodos).toHaveBeenCalledTimes(1);

      await waitForValueToChange(() => result.current.todos);

      expect(result.current.todos.length).toEqual(0);
    });
  });

  it("Set Show Status", async () => {
    const { result, waitForValueToChange } = renderHook(() => useTodoStore((state) => state));

    const mockSetShowStatus = jest.spyOn(result.current, "setShowStatus");

    await act(async () => {
      const showStatus = TodoStatus.COMPLETED;

      result.current.setShowStatus(showStatus);

      expect(mockSetShowStatus).toHaveBeenCalledTimes(1);

      expect(mockSetShowStatus).toHaveBeenCalledWith(showStatus);

      await waitForValueToChange(() => result.current.showStatus);

      expect(result.current.showStatus).toEqual(showStatus);
    });

    await act(async () => {
      const showStatus = TodoStatus.ACTIVE;

      result.current.setShowStatus(showStatus);

      expect(mockSetShowStatus).toHaveBeenCalledTimes(2);

      expect(mockSetShowStatus).toHaveBeenCalledWith(showStatus);

      await waitForValueToChange(() => result.current.showStatus);

      expect(result.current.showStatus).toEqual(showStatus);
    });

    await act(async () => {
      const showStatus = TodoStatus.ALL;

      result.current.setShowStatus(showStatus);

      expect(mockSetShowStatus).toHaveBeenCalledTimes(3);

      expect(mockSetShowStatus).toHaveBeenCalledWith(showStatus);

      await waitForValueToChange(() => result.current.showStatus);

      expect(result.current.showStatus).toEqual(showStatus);
    });
  });
});
