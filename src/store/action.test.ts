import { Todo, TodoStatus } from "../models/todo";
import {
  createTodo,
  CREATE_TODO,
  deleteAllTodos,
  deleteTodo,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  setTodos,
  SET_TODO,
  toggleAllTodos,
  TOGGLE_ALL_TODOS,
  updateTodo,
  updateTodoStatus,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
} from "./actions";

const todo1: Todo = {
  id: "1",
  content: "test",
  user_id: "user1",
  created_date: "1000",
  status: TodoStatus.ACTIVE,
};

const todo2: Todo = {
  id: "2",
  content: "test",
  user_id: "user1",
  created_date: "1000",
  status: TodoStatus.ACTIVE,
};

const todos = [todo1, todo2].concat([]);

test("Action set todos", () => {
  const actionPayload = setTodos(todos);

  expect(actionPayload).toEqual({
    type: SET_TODO,
    payload: todos,
  });
});

test("Action create todo", () => {
  const actionPayload = createTodo(todo1);

  expect(actionPayload).toEqual({ type: CREATE_TODO, payload: todo1 });
});

test("Action update todo status", () => {
  const checked = true;
  const actionPayload = updateTodoStatus(todo1.id, checked);

  expect(actionPayload).toEqual({
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId: todo1.id,
      checked,
    },
  });
});

test("Action update todo", () => {
  const actionPayload = updateTodo(todo1);

  expect(actionPayload).toEqual({
    type: UPDATE_TODO,
    payload: todo1,
  });
});

test("Action delete todo", () => {
  const actionPayload = deleteTodo(todo1.id);

  expect(actionPayload).toEqual({
    type: DELETE_TODO,
    payload: todo1.id,
  });
});

test("Action delete all todos", () => {
  const actionPayload = deleteAllTodos();

  expect(actionPayload).toEqual({
    type: DELETE_ALL_TODOS,
  });
});

test("Action toggle all todos", () => {
  const checked = true;
  const actionPayload = toggleAllTodos(checked);

  expect(actionPayload).toEqual({
    type: TOGGLE_ALL_TODOS,
    payload: checked,
  });
});
