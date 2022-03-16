import reducer, { AppState, initialState } from "../reducer";
import Service from "../../service";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus,
} from "../actions";
import { TodoStatus } from "models";

let state: AppState = initialState;

describe("Check reducer work correctly", () => {
  it("set todo", async () => {
    const todo1 = await Service.createTodo("the saved todo 1");
    const todo2 = await Service.createTodo("the saved todo 2");
    const action = setTodos([todo1, todo2]);
    state = reducer(state, action);

    expect(state).toEqual({
      todos: [todo1, todo2],
    });
  });

  it("create todo", async () => {
    const todo = await Service.createTodo("the new todo 1");
    const action = createTodo(todo);
    state = reducer(state, action);

    expect(state.todos).toEqual(expect.arrayContaining([todo]));
  });

  it("update todos status", async () => {
    const todo = state.todos[0];
    const action = updateTodoStatus(todo.id, true);
    state = reducer(state, action);

    expect(todo).toMatchObject({ status: "COMPLETED" });

    expect(state.todos).toEqual(expect.arrayContaining([todo]));
  });

  it("update todos content", async () => {
    const todo = state.todos[0];
    const action = updateTodoContent(todo.id, "new content");
    state = reducer(state, action);

    expect(todo).toMatchObject({ content: "new content" });

    expect(state.todos).toEqual(expect.arrayContaining([todo]));
  });

  it("delete todo", async () => {
    const todo = state.todos[0];
    const action = deleteTodo(todo.id);
    state = reducer(state, action);

    expect(state.todos).not.toEqual(expect.arrayContaining([todo]));
  });

  it("toggleAllTodos with false value", async () => {
    const action = toggleAllTodos(false);
    state = reducer(state, action);

    expect(
      state.todos.filter((todo) => todo.status === TodoStatus.ACTIVE).length
    ).toEqual(state.todos.length);
  });

  it("toggleAllTodos with true value", async () => {
    const action = toggleAllTodos(true);
    state = reducer(state, action);

    expect(
      state.todos.filter((todo) => todo.status === TodoStatus.COMPLETED).length
    ).toEqual(state.todos.length);
  });

  it("deleteAllTodos", async () => {
    const action = deleteAllTodos();
    state = reducer(state, action);

    expect(state).toEqual({
      todos: [],
    });
  });
});
