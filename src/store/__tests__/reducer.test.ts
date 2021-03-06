import reducer from "../reducer";
import { Todo, TodoStatus } from "./../../models/todo";
import {
  createTodo,
  setTodos,
  updateTodoStatus,
  toggleAllTodos,
  updateTodoContent,
  deleteAllTodos,
} from "./../actions";
import { AppState, initialState } from "./../reducer";

const todo: Todo = {
  id: "mock",
  user_id: "mock",
  content: "Todo mock",
  status: TodoStatus.ACTIVE,
  created_date: new Date().toISOString(),
};

const todo1: Todo = {
  id: "1",
  user_id: "1",
  content: "1",
  status: TodoStatus.COMPLETED,
  created_date: new Date().toISOString(),
};

const state: AppState = {
  todos: [todo],
};

describe("todo reducer", () => {
  it("should return default state", () => {
    expect(reducer(initialState, {} as any)).toEqual({
      todos: [...initialState.todos],
    });
  });

  const setTodosAction = setTodos([todo, todo1]); // or []
  it("Set Todo should return new todos include todo and todo1", () => {
    expect(reducer(initialState, setTodosAction)).toEqual({
      todos: [...initialState.todos, todo, todo1],
    });
  });

  const createTodoAction = createTodo(todo1);
  it("Create Todo should return new todos include todo1", () => {
    expect(reducer(state, createTodoAction)).toEqual({
      todos: [...state.todos, createTodoAction.payload],
    });
  });

  // state include [todo]
  // update status todo
  const updateTodoStatusAction = updateTodoStatus(todo.id, true);
  // const todoCopy = todo;
  const todoCopy = Object.assign({}, todo); // shallow copy
  todoCopy.status = TodoStatus.COMPLETED;
  it("should handle update status", () => {
    expect(reducer(state, updateTodoStatusAction).todos[0].status).toMatch(
      "COMPLETED"
    );
  });

  // true: COMPLETED
  // todo1 status = COMPLETED
  // todoCopy(form todo) status =  COMPLETED
  const toggleAllTodosAction = toggleAllTodos(true);
  it("should handle toggle all todos", () => {
    expect(
      reducer(
        {
          todos: [todo, todo1],
        },
        toggleAllTodosAction
      )
    ).toEqual({
      todos: [todoCopy, todo1],
    });
  });

  // UPDATE_TODO_CONTENT
  // create new todo from todo1
  // update content new todo
  const contentUpdate = "todo content update";
  const todoUpdateContent = Object.assign({}, todo1);
  todoUpdateContent.content = contentUpdate;
  const updateTodoContentAction = updateTodoContent(todo1.id, contentUpdate);
  it("should handle update content", () => {
    expect(reducer({ todos: [todo1] }, updateTodoContentAction)).toEqual({
      todos: [todoUpdateContent],
    });
  });

  // delete all todos
  it("delete all todos should return []", () => {
    expect(
      reducer({ todos: [todo, todo1, todoUpdateContent] }, deleteAllTodos())
    ).toEqual({
      todos: [],
    });
  });
});
