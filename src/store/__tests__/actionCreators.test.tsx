import { ThemeType } from "models/theme";
import { TodoStatus } from "models/todo"
import { 
  createTodo, 
  deleteAllTodos, 
  deleteTodo, 
  toggleAllTodos, 
  toggleTheme, 
  updateTodoContent, 
  updateTodoStatus 
} from "store/action-creators"
import { 
  CREATE_TODO, 
  DELETE_ALL_TODOS, 
  DELETE_TODO, 
  TOGGLE_ALL_TODOS, 
  TOGGLE_THEME, 
  UPDATE_TODO_CONTENT, 
  UPDATE_TODO_STATUS 
} from "store/action-types";
import { 
  CreateTodoAction, 
  DeleteAllTodosAction, 
  DeleteTodoAction, 
  ToggleAllTodosAction, 
  ToggleThemeAction, 
  UpdateTodoContentAction, 
  UpdateTodoStatusAction 
} from "store/actions";

describe("app action creators tests", () => {
  const createdDate = new Date().toISOString();
  const todoItem = {
    id: "id_1",
    user_id: "test",
    content : "test",
    status: TodoStatus.ACTIVE,
    created_date: createdDate,
  }
  const config = {
    todoId: "test_id",
    status: TodoStatus.COMPLETED,
  }
  test("returns an correct action when call `createTodo`", () => {
    const action: CreateTodoAction = createTodo(todoItem);
    const expectedAction: CreateTodoAction = {
      type: CREATE_TODO,
      payload: todoItem,
    }
    expect(action).toEqual(expectedAction);
  })
  test("returns an correct action when call `updateTodoStatus`", () => {
    const action: UpdateTodoStatusAction = updateTodoStatus(config.todoId, config.status);
    const expectedAction: UpdateTodoStatusAction = {
      type: UPDATE_TODO_STATUS,
      payload: config
    }
    expect(action).toEqual(expectedAction);
  })
  test("returns an correct action when call `updateTodoContent`", () => {
    const content = "test content";
    const action: UpdateTodoContentAction = updateTodoContent(config.todoId, content);
    const expectedAction: UpdateTodoContentAction = {
      type: UPDATE_TODO_CONTENT,
      payload: {
        todoId: config.todoId,
        content: content,
      }
    }
    expect(action).toEqual(expectedAction);
  })
  test("returns an correct action when call `deleteTodo`", () => {
    const action: DeleteTodoAction = deleteTodo(config.todoId);
    const expectedAction: DeleteTodoAction = {
      type: DELETE_TODO,
      payload: config.todoId
    }
    expect(action).toEqual(expectedAction);
  })
  test("returns an correct action when call `deleteAllTodos`", () => {
    const action: DeleteAllTodosAction = deleteAllTodos();
    const expectedAction: DeleteAllTodosAction = {
      type: DELETE_ALL_TODOS,
    }
    expect(action).toEqual(expectedAction);
  })
  test("returns an correct action when call `toggleAllTodos`", () => {
    const action: ToggleAllTodosAction = toggleAllTodos(config.status);
    const expectedAction: ToggleAllTodosAction = {
      type: TOGGLE_ALL_TODOS,
      payload: config.status
    }
    expect(action).toEqual(expectedAction);
  })
  test("returns an correct action when call `toggleTheme`", () => {
    const action: ToggleThemeAction = toggleTheme(ThemeType.DARK);
    const expectedAction: ToggleThemeAction = {
      type: TOGGLE_THEME,
      payload: ThemeType.DARK
    }
    expect(action).toEqual(expectedAction);
  })
})