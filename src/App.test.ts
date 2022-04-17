import { Todo, TodoStatus } from "./models/todo";
import Service from "./service";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus,
} from "./store/actions";
import reducer, { AppState } from "./store/reducer";

let state: AppState = { todos: [] };
const spy = jest.spyOn(Storage.prototype, "setItem");
let globalResp: Todo = {};

// or

Storage.prototype.getItem = jest.fn(() => "bla");

test("Create todo length = 3", async () => {
  let resp: Todo = await Service.createTodo("Testing my create todo");
  state = reducer(state, createTodo(resp));
  resp = await Service.createTodo("123456");
  state = reducer(state, createTodo(resp));
  resp = await Service.createTodo("abcxyz");
  state = reducer(state, createTodo(resp));
  expect(state.todos.length).toEqual(3);
});

test("Create todo newest on top", async () => {
  let resp: Todo = await Service.createTodo("Created first");
  state = reducer(state, createTodo(resp));
  globalResp = await Service.createTodo("This should be on top");
  state = reducer(state, createTodo(globalResp));
  expect(state.todos[0].id).toEqual(globalResp.id);
});

test("Delete to do This should be on top", async () => {
  state = reducer(state, deleteTodo(globalResp.id));
  expect(
    state.todos.findIndex(
      (i: Todo) =>
        i.id === globalResp.id || i.content === "This should be on top"
    )
  ).toEqual(-1);
  expect(state.todos.length).toEqual(4);
});

test("Update todo status and content", async () => {
  let resp: Todo = await Service.createTodo("This will be changed");
  state = reducer(state, createTodo(resp));
  let newlyCreatedTodo = state.todos.find((i: Todo) => i.id === resp.id);
  expect(newlyCreatedTodo?.status).toEqual(TodoStatus.ACTIVE);
  expect(newlyCreatedTodo?.content).toEqual("This will be changed");
  state = reducer(state, updateTodoContent(resp.id, "Successfully updated"));
  state = reducer(state, updateTodoStatus(resp.id, true));
  newlyCreatedTodo = state.todos.find((i: Todo) => i.id === resp.id);
  expect(newlyCreatedTodo?.status).toEqual(TodoStatus.COMPLETED);
  expect(newlyCreatedTodo?.content).toEqual("Successfully updated");
});

test("Toggle all todos", async () => {
  state = reducer(state, toggleAllTodos(true, "ALL"));
  expect(
    state.todos.findIndex((i: Todo) => i.status === TodoStatus.ACTIVE)
  ).toEqual(-1);
  state = reducer(state, toggleAllTodos(false, "ALL"));
  expect(
    state.todos.findIndex((i: Todo) => i.status === TodoStatus.COMPLETED)
  ).toEqual(-1);
});

test("Toggle all todos with custom status", async () => {
  let tempTodos = [...state.todos];
  for (let i = 0; i < 3; i++) {
    tempTodos[i].status = TodoStatus.COMPLETED;
  }
  state = reducer(state, setTodos(tempTodos));
  expect(
    state.todos.filter((i: Todo) => i.status === TodoStatus.COMPLETED).length
  ).toEqual(3);
  // This should not change anything
  state = reducer(state, toggleAllTodos(true, TodoStatus.COMPLETED));
  expect(
    state.todos.filter((i: Todo) => i.status === TodoStatus.COMPLETED).length
  ).toEqual(3);
  // This change all active todos to completed
  state = reducer(state, toggleAllTodos(true, TodoStatus.ACTIVE));
  expect(
    state.todos.filter((i: Todo) => i.status === TodoStatus.COMPLETED).length
  ).toEqual(5);
  // This should not change anything
  state = reducer(state, toggleAllTodos(false, TodoStatus.ACTIVE));
  expect(
    state.todos.filter((i: Todo) => i.status === TodoStatus.COMPLETED).length
  ).toEqual(5);
});

test("Delete all todos", async () => {
  state = reducer(state, deleteAllTodos());
  expect(state.todos.length).toEqual(0);
});

export {};
