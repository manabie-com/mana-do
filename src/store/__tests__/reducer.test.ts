import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import todoReducer from "store/reducer";
import {
  SET_TODO,
  CREATE_TODO,
  DELETE_TODO,
  DELETE_ALL_TODOS,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
} from "store/actions";
import { Todo, TodoStatus } from "models/todo";
import { mockTodos, mockNewSingleTodo } from "data/mockData";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("todoReducer", () => {
  test("SET_TODO: remove current todos, then set new todo/s", () => {
    const initialState = {
      todos: mockTodos,
    };

    const { todos: updatedTodos } = todoReducer(initialState, {
      type: SET_TODO,
      payload: mockNewSingleTodo,
    });
    expect(updatedTodos).toStrictEqual([mockNewSingleTodo]);
  });

  test("CREATE_TODO: it should add new todo into state", () => {
    const initialState = {
      todos: mockTodos,
    };

    const { todos: updatedTodos } = todoReducer(initialState, {
      type: CREATE_TODO,
      payload: mockNewSingleTodo,
    });
    expect(updatedTodos).toStrictEqual([...mockTodos, mockNewSingleTodo]);
  });
  test("UPDATE_TODO_STATUS: it should update status", () => {
    const testId = mockTodos[3].id;
    const init = (testId: string, mockTodos: Todo[], status: TodoStatus) => {
      const isChecked = status === TodoStatus.COMPLETED ? true : false;
      return todoReducer(
        {
          todos: mockTodos,
        },
        {
          type: UPDATE_TODO_STATUS,
          payload: { todoId: testId, checked: isChecked },
        }
      );
    };
    const filterOutSelectedId = (arr: Todo[], filtedId: string) => {
      return arr.filter((el) => el.id !== filtedId);
    };

    let testChecked = TodoStatus.COMPLETED;

    let { todos: updatedTodos } = init(testId, mockTodos, testChecked);
    // TEST CASE 1: set status === "COMPLETED"
    // other todos status will stay the same
    expect(updatedTodos[3].status).toBe(testChecked);
    expect(filterOutSelectedId(updatedTodos, testId)).toStrictEqual(
      filterOutSelectedId(mockTodos, testId)
    );
    // TEST CASE 2: set status === "ACTIVE"
    // other todos status will stay the same
    testChecked = TodoStatus.ACTIVE;
    ({ todos: updatedTodos } = init(testId, mockTodos, testChecked));
    expect(updatedTodos[3].status).toBe(testChecked);
    expect(filterOutSelectedId(updatedTodos, testId)).toStrictEqual(
      filterOutSelectedId(mockTodos, testId)
    );
    // TEST CASE 3: set status === "COMPLETED"
    // other todos status will stay the same
    testChecked = TodoStatus.COMPLETED;
    ({ todos: updatedTodos } = init(testId, mockTodos, testChecked));
    expect(updatedTodos[3].status).toBe(testChecked);
    expect(filterOutSelectedId(updatedTodos, testId)).toStrictEqual(
      filterOutSelectedId(mockTodos, testId)
    );
  });
  test("TOGGLE_ALL_TODOS: every todo status should update at once", () => {
    let testChecked = TodoStatus.COMPLETED;

    const init = (mockTodos: Todo[], status: TodoStatus) => {
      const isChecked = status === TodoStatus.COMPLETED ? true : false;
      return todoReducer(
        {
          todos: mockTodos,
        },
        {
          type: TOGGLE_ALL_TODOS,
          payload: { checked: isChecked },
        }
      );
    };

    let { todos: updatedTodos } = init(mockTodos, testChecked);
    // TEST CASE 1: set status === "COMPLETED"
    updatedTodos.map((el) => expect(el.status).toBe(testChecked));
    // TEST CASE 2: set status === "ACTIVE"
    testChecked = TodoStatus.ACTIVE;
    ({ todos: updatedTodos } = init(mockTodos, testChecked));
    updatedTodos.map((el) => expect(el.status).toBe(testChecked));
  });
  test("DELETE_TODO: only the selected todo got removed", () => {
    let testId = mockTodos[5].id;
    const init = (testId: string, mockTodos: Todo[]) => {
      return todoReducer(
        {
          todos: mockTodos,
        },
        {
          type: DELETE_TODO,
          payload: { id: testId },
        }
      );
    };

    let { todos: updatedTodos } = init(testId, mockTodos);
    // only 1 todo got removed
    expect(updatedTodos.length).toBe(mockTodos.length - 1);
    // and the selected todo got removed
    expect(updatedTodos.map((el) => el.id).includes(testId)).toBe(false);
    // the remaining todos stay intact
    expect(updatedTodos).toStrictEqual(
      mockTodos.filter((el) => el.id !== testId)
    );
  });
  test("DELETE_ALL_TODOS: all todos should be deleted", () => {
    const init = (mockTodos: Todo[]) => {
      return todoReducer(
        {
          todos: mockTodos,
        },
        {
          type: DELETE_ALL_TODOS,
        }
      );
    };
    const { todos: deletedTodos } = init(mockTodos);
    expect(deletedTodos).toStrictEqual([]);
  });
  test("UPDATE_TODO: only the selected todo got updated", () => {
    const testId = mockTodos[4].id;
    const testContent = "hello world";
    const init = (
      testId: Todo["id"],
      testContent: Todo["content"],
      mockTodos: Todo[]
    ) => {
      return todoReducer(
        {
          todos: mockTodos,
        },
        {
          type: UPDATE_TODO,
          payload: {
            id: testId,
            content: testContent,
          },
        }
      );
    };

    const { todos: updatedTodos } = init(testId, testContent, mockTodos);
    // selected todo content match test case
    expect(updatedTodos.find((el) => el.id === testId)?.content).toBe(
      testContent
    );
    // selected todo status should not change
    expect(updatedTodos.find((el) => el.id === testId)?.status).toEqual(
      mockTodos.find((el) => el.id === testId)?.status
    );
    // the remaining todos stay intact
    expect(updatedTodos.filter((el) => el.id !== testId)).toStrictEqual(
      mockTodos.filter((el) => el.id !== testId)
    );
  });
});
