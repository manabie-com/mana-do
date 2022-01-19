import reducer, { AppState } from "./reducer";
import { Todo, TodoStatus } from "../models/todo";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
} from "./actions";

const testTodo: Todo[] = [
  {
    id: "1",
    user_id: "TestUser1",
    content: "Test 1",
    status: TodoStatus.ACTIVE,
    created_date: new Date().toUTCString(),
  },
  {
    id: "2",
    user_id: "TestUser2",
    content: "Test 2",
    status: TodoStatus.ACTIVE,
    created_date: new Date().toUTCString(),
  },
  {
    id: "3",
    user_id: "TestUser3",
    content: "Test 3",
    status: TodoStatus.ACTIVE,
    created_date: new Date().toUTCString(),
  },
];

const initialState: AppState = {
  todos: [],
};

describe("Reducer", () => {
  test("Should be able to set todo list successfully", () => {
    const newTodo = reducer(initialState, setTodos(testTodo));
    expect(newTodo.todos.length).toBe(3);
    expect(newTodo.todos).toEqual(testTodo);
  });

  test("Should be able to create a todo item successfully", () => {
    const newTodo = reducer(initialState, createTodo(testTodo[0]));
    expect(newTodo.todos.length).toBe(1);
    expect(newTodo.todos[0]).toEqual(testTodo[0]);
  });

  test("Should be able to update a todo item content successfully", () => {
    const testContent = "Test Success";
    const sampleState: AppState = {
      todos: testTodo,
    };

    const updatedTodo = reducer(sampleState, updateTodoContent(sampleState.todos[0].id, testContent));
    expect(updatedTodo.todos.length).toBe(3);
    expect(updatedTodo.todos[0].content).toEqual(testContent);
  });

  test("Should be able to update a todo item status successfully", () => {
    const checked = true;
    const sampleState: AppState = {
      todos: testTodo,
    };

    const updatedTodo = reducer(sampleState, updateTodoStatus(sampleState.todos[0].id, checked));
    expect(updatedTodo.todos.length).toBe(3);
    expect(updatedTodo.todos[0].status).toEqual(TodoStatus.COMPLETED);
  });

  test("Should be able to toggle status of all todo items successfully", () => {
    const sampleState: AppState = {
      todos: testTodo,
    };

    let checked = true;
    const updatedTodo1 = reducer(sampleState, toggleAllTodos(checked));
    expect(updatedTodo1.todos.length).toBe(3);
    expect(updatedTodo1.todos[0].status).toEqual(TodoStatus.COMPLETED);
    expect(updatedTodo1.todos[1].status).toEqual(TodoStatus.COMPLETED);
    expect(updatedTodo1.todos[2].status).toEqual(TodoStatus.COMPLETED);

    checked = false;
    const updatedTodo2 = reducer(sampleState, toggleAllTodos(checked));
    expect(updatedTodo2.todos.length).toBe(3);
    expect(updatedTodo2.todos[0].status).toEqual(TodoStatus.ACTIVE);
    expect(updatedTodo2.todos[1].status).toEqual(TodoStatus.ACTIVE);
    expect(updatedTodo2.todos[2].status).toEqual(TodoStatus.ACTIVE);
  });

  test("Should be able to delete a todo item successfully", () => {
    const sampleState: AppState = {
      todos: [
        {
          id: "1",
          user_id: "TestUser1",
          content: "Test 1",
          status: TodoStatus.ACTIVE,
          created_date: new Date().toUTCString(),
        },
        {
          id: "2",
          user_id: "TestUser2",
          content: "Test 2",
          status: TodoStatus.ACTIVE,
          created_date: new Date().toUTCString(),
        },
      ],
    };

    reducer(sampleState, deleteTodo(sampleState.todos[0].id));
    expect(sampleState.todos.length).toBe(1);
    expect(sampleState.todos[0]).toEqual(testTodo[1]);
  });

  test("Should be able to delete all todo items successfully", () => {
    const sampleState: AppState = {
      todos: testTodo,
    };

    const updatedTodo = reducer(sampleState, deleteAllTodos());
    expect(updatedTodo.todos.length).toBe(0);
  });
});
