import shortid from "shortid";
import { Todo, TodoStatus } from "../../models/todo";
import { createTodo, deleteTodo } from "../actions";
import reducer from "../reducer";

describe("Todo reducer", () => {
  test("should add todo success", () => {
    const initialState = { todos: [] };
    const newTodo: Todo = {
      id: shortid(),
      content: "New todo",
      user_id: "newUser",
      created_date: new Date().toUTCString(),
      status: TodoStatus.ACTIVE,
    };

    const newState = reducer(initialState, createTodo(newTodo));

    expect(newState.todos.length).toBe(1);
    expect(newState.todos[0].content).toBe("New todo");
  });

  test("should remove todo success", () => {
    const initialState = {
      todos: [
        {
          id: "1",
          content: "New todo 1",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        },
        {
          id: "2",
          content: "New todo 2",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        },
      ],
    };

    const newState = reducer(initialState, deleteTodo('1'));

    expect(newState.todos.length).toBe(1);
    expect(newState.todos[0].content).toBe("New todo 2");
  });
});
