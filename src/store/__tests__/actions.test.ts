import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoStatus,
} from "../actions";

describe("Check todo action", () => {
  it("Check setTodos", () => {
    expect(setTodos([])).toMatchObject({ type: "SET_TODO" });
    expect(setTodos([])).toHaveProperty("payload");
  });

  it("Check createTodo", () => {
    expect(
      createTodo({
        id: "",
        user_id: "",
        content: "",
        created_date: "",
      })
    ).toMatchObject({ type: "CREATE_TODO" });
    expect(
      createTodo({
        id: "",
        user_id: "",
        content: "",
        created_date: "",
      })
    ).toHaveProperty("payload");
  });

  it("Check updateTodoStatus", () => {
    expect(updateTodoStatus("", true)).toMatchObject({
      type: "UPDATE_TODO_STATUS",
    });
    expect(updateTodoStatus("", true)).toHaveProperty("payload");
  });

  it("Check deleteTodo", () => {
    expect(deleteTodo("")).toMatchObject({ type: "DELETE_TODO" });
    expect(deleteTodo("")).toHaveProperty("payload");
  });

  it("Check deleteAllTodos", () => {
    expect(deleteAllTodos()).toMatchObject({ type: "DELETE_ALL_TODOS" });
  });

  it("Check toggleAllTodos", () => {
    expect(toggleAllTodos(true)).toMatchObject({ type: "TOGGLE_ALL_TODOS" });
    expect(toggleAllTodos(true)).toHaveProperty("payload");
  });
});
