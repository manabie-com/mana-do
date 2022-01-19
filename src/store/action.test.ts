import { Todo, TodoStatus } from "../models/todo";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
  SetTodoAction,
  CreateTodoAction,
  UpdateTodoStatusAction,
  UpdateTodoContentAction,
  DeleteTodoAction,
  DeleteAllTodosAction,
  ToggleAllTodosAction,
} from "./actions";

const testTodo: Todo = {
  id: "1",
  user_id: "TestUser1",
  content: "Test 1",
  status: TodoStatus.ACTIVE,
  created_date: new Date().toUTCString(),
};

describe("Action", () => {
  test("Should create setTodos action successfully", () => {
    const action: SetTodoAction = {
      type: SET_TODO,
      payload: [testTodo],
    };
    const result = setTodos([testTodo]);
    expect(result).toEqual(action);
  });

  test("Should create createTodo action successfully", () => {
    const action: CreateTodoAction = {
      type: CREATE_TODO,
      payload: testTodo,
    };
    const result = createTodo(testTodo);
    expect(result).toEqual(action);
  });

  test("Should create updateTodoStatus action successfully", () => {
    const checked = true;
    const action: UpdateTodoStatusAction = {
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: testTodo.id,
        checked: checked,
      },
    };

    const result = updateTodoStatus(testTodo.id, checked);
    expect(result).toEqual(action);
  });

  test("Should create updateTodoContent action successfully", () => {
    const content = "content";
    const action: UpdateTodoContentAction = {
      type: UPDATE_TODO_CONTENT,
      payload: {
        todoId: testTodo.id,
        content: content,
      },
    };

    const result = updateTodoContent(testTodo.id, content);
    expect(result).toEqual(action);
  });

  test("Should create deleteTodo action successfully", () => {
    const action: DeleteTodoAction = {
      type: DELETE_TODO,
      payload: testTodo.id,
    };
    const result = deleteTodo(testTodo.id);
    expect(result).toEqual(action);
  });

  test("Should create deleteAllTodos action successfully", () => {
    const action: DeleteAllTodosAction = {
      type: DELETE_ALL_TODOS,
    };

    const result = deleteAllTodos();
    expect(result).toEqual(action);
  });

  test("Should create toggleAllTodos action successfully", () => {
    const checked = true;
    const action: ToggleAllTodosAction = {
      type: TOGGLE_ALL_TODOS,
      payload: checked,
    };
    const result = toggleAllTodos(checked);
    expect(result).toEqual(action);
  });
});
