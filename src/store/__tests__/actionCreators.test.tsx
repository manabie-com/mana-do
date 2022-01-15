import { TodoStatus } from "models/todo"
import { createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoStatus } from "store/action-creators"
import { 
  CREATE_TODO, 
  DELETE_ALL_TODOS, 
  DELETE_TODO, 
  SET_TODO, 
  TOGGLE_ALL_TODOS, 
  UPDATE_TODO_STATUS 
} from "store/action-types";
import { 
  CreateTodoAction, 
  DeleteAllTodosAction, 
  DeleteTodoAction, 
  SetTodoAction, 
  ToggleAllTodosAction, 
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
    checked: true
  }
  test("returns an correct action when call `setTodos`", () => {
    const action: SetTodoAction = setTodos([ todoItem ]);
    const expectedAction: SetTodoAction = {
      type: SET_TODO,
      payload: [ todoItem ]
    }
    expect(action).toEqual(expectedAction);
  })
  test("returns an correct action when call `createTodo`", () => {
    const action: CreateTodoAction = createTodo(todoItem);
    const expectedAction: CreateTodoAction = {
      type: CREATE_TODO,
      payload: todoItem
    }
    expect(action).toEqual(expectedAction);
  })
  test("returns an correct action when call `updateTodoStatus`", () => {
    const action: UpdateTodoStatusAction = updateTodoStatus(config.todoId, config.checked);
    const expectedAction: UpdateTodoStatusAction = {
      type: UPDATE_TODO_STATUS,
      payload: config
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
    const action: ToggleAllTodosAction = toggleAllTodos(true);
    const expectedAction: ToggleAllTodosAction = {
      type: TOGGLE_ALL_TODOS,
      payload: true
    }
    expect(action).toEqual(expectedAction);
  })
})