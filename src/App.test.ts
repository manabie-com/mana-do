import { ITodo, TodoStatus } from "./models/todo";
import Service from "./service";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus,
} from "./store/actions";
import reducer, { AppState } from "./store/reducer";

let state: AppState = { todos: [] };

test("Create list todo length is 3", async () => {
  let res: ITodo = await Service.createTodo("content 1");
  state = reducer(state, createTodo(res));
  res = await Service.createTodo("content 2");
  state = reducer(state, createTodo(res));
  res = await Service.createTodo("content 3");
  state = reducer(state, createTodo(res));
  expect(state.todos.length).toEqual(3);
});

test("Delete todo", async () => {
  let res: ITodo = await Service.createTodo("content todo");
  state = reducer(state, createTodo(res));
  state = reducer(state, deleteTodo(res.id));
  expect(
    state.todos.findIndex(
      (i: ITodo) => i.id === res.id || i.content === "content todo"
    )
  ).toEqual(-1);
  expect(state.todos.length).toEqual(3);
});

test("Update todo status and content", async () => {
  let res: ITodo = await Service.createTodo("Todo content");
  state = reducer(state, createTodo(res));
  let newTodo = state.todos.find((i: ITodo) => i.id === res.id);
  expect(newTodo?.status).toEqual(TodoStatus.ACTIVE);
  expect(newTodo?.content).toEqual("Todo content");
  state = reducer(state, updateTodoContent(res.id, "Successfully updated"));
  state = reducer(state, updateTodoStatus(res.id, true));
  newTodo = state.todos.find((i: ITodo) => i.id === res.id);
  expect(newTodo?.status).toEqual(TodoStatus.COMPLETED);
  expect(newTodo?.content).toEqual("Successfully updated");
});

test("Toggle all todos", async () => {
  state = reducer(state, toggleAllTodos(true));
  expect(
    state.todos.findIndex((i: ITodo) => i.status === TodoStatus.ACTIVE)
  ).toEqual(-1);
  state = reducer(state, toggleAllTodos(false));
  expect(
    state.todos.findIndex((i: ITodo) => i.status === TodoStatus.COMPLETED)
  ).toEqual(-1);
});

test("Delete all todos", async () => {
  state = reducer(state, deleteAllTodos());
  expect(state.todos.length).toEqual(0);
});

export {};
