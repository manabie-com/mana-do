import shortid from "shortid";
import { Todo, TodoStatus } from "../../models/todo";

import reducer, { initialState } from "../../store/reducer";
import {
  createTodo,
  setTodos,
  updateTodoStatus,
  deleteTodo,
  deleteAllTodos,
  toggleAllTodos,
  updateTodo,
} from "./../../store/actions";

const todo: Todo = {
  content: "fake content 1",
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: shortid(),
  user_id: "userId1",
  number_id: 1,
};

const todo2: Todo = {
  content: "fake content 2",
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: shortid(),
  user_id: "userId2",
  number_id: 2,
};

describe("reducer", () => {
  describe("CREATE_TODO", () => {
    it("should create todo", () => {
      const nextState = reducer(initialState, createTodo(todo));
      expect(nextState.todos).toEqual([todo]);
    });
  });
  describe("SET_TODO", () => {
    it("should set todos", () => {
      const nextState = reducer(initialState, setTodos([todo, todo2]));
      expect(nextState.todos.length).toEqual(2);
    });
  });
  describe("UPDATE_TODO_STATUS", () => {
    it("should update todo", () => {
      const newinitialState = initialState;
      newinitialState.todos = [todo];
      const nextState = reducer(initialState, updateTodoStatus(todo.id, true));
      expect(nextState.todos.find((x) => x.id === todo.id)?.status).toEqual(
        TodoStatus.COMPLETED
      );
    });
  });
  describe("DELETE_TODO", () => {
    it("should delete todo", () => {
      const newinitialState = initialState;
      newinitialState.todos = [todo, todo2];
      const nextState = reducer(initialState, deleteTodo(todo.id));
      expect(nextState.todos.find((x) => x.id === todo.id)).toEqual(undefined);
      expect(nextState.todos.find((x) => x.id === todo2.id)).toEqual(todo2);
    });
  });
  describe("DELETE_ALL_TODOS", () => {
    it("should delete todos", () => {
      const newinitialState = initialState;
      newinitialState.todos = [todo, todo2];
      const nextState = reducer(initialState, deleteAllTodos());
      expect(nextState.todos.find((x) => x.id === todo.id)).toEqual(undefined);
      expect(nextState.todos.find((x) => x.id === todo2.id)).toEqual(undefined);
    });
  });
  describe("TOGGLE_ALL_TODOS", () => {
    it("should toggle all todos", () => {
      const newinitialState = initialState;
      newinitialState.todos = [todo, todo2];
      const nextState = reducer(initialState, toggleAllTodos(true));
      expect(nextState.todos.find((x) => x.id === todo.id)?.status).toEqual(
        TodoStatus.COMPLETED
      );
      expect(nextState.todos.find((x) => x.id === todo2.id)?.status).toEqual(
        TodoStatus.COMPLETED
      );
    });
  });
  describe("UPDATE_TODO", () => {
    it("should update todo", () => {
      const newinitialState = initialState;
      newinitialState.todos = [todo, todo2];
      const nextState = reducer(
        initialState,
        updateTodo(todo2.id, "update todo 2")
      );
      expect(nextState.todos.find((x) => x.id === todo2.id)?.content).toEqual(
        "update todo 2"
      );
    });
  });
});
