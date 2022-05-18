import shortid from "shortid";
import { Todo, TodoStatus } from "../models/todo";

import reducer, { AppState, initialState } from "../store/reducer";
import {
  createTodo,
  updateTodoStatus,
  updateTodo,
} from "../store/actions";

const todo: Todo = {
  user_id: "userId1",
  content: "Hom nay lam gi",
  created_date: new Date().toISOString(),
  status: TodoStatus.DO,
  id: shortid()
};
const todo_update: Todo = {
  user_id: "userId1",
  content: "Hom nay lam gi da thay doi",
  created_date: new Date().toISOString(),
  status: TodoStatus.DO,
  id: shortid()
};
const dataTodo: AppState = {
  todos: [],
  todosDoing: [],
  todosUrgent: [],
  todosDonot: [],
  todosDone: [],
  todosRemoved: []
}
  describe("CREATE_TODO", () => {
    it("should create todo", () => {
      const nextState = reducer(initialState, createTodo(todo));
      let data = { ...dataTodo, todos: [...dataTodo.todos, todo] }
      expect(nextState.todos.length).toEqual(data.todos.length);
    });
  });

  describe("UPDATE_TODO_STATUS", () => {
    it("should update status todos", () => {
      const nextState = reducer(initialState, updateTodoStatus(todo, TodoStatus.DO, TodoStatus.DOING));
      let data = { ...dataTodo, todosDoing: [...dataTodo.todosDoing, todo] }
      expect(nextState.todosDoing.length).toEqual(data.todosDoing.length);
    });
  });

  describe("UPDATE_TODO_STATUS", () => {
    it("should update status todos", () => {
      const nextState = reducer(initialState, updateTodoStatus(todo, TodoStatus.DO, TodoStatus.DONOT));
      let data = { ...dataTodo, todosDonot: [...dataTodo.todosDonot, todo] }
      expect(nextState.todosDonot.length).toEqual(data.todosDonot.length);
    });
  });

  describe("UPDATE_TODO_STATUS", () => {
    it("should update status todos", () => {
      const nextState = reducer(initialState, updateTodoStatus(todo, TodoStatus.DO, TodoStatus.DONE));
      let data = { ...dataTodo, todosDone: [...dataTodo.todosDone, todo] }
      expect(nextState.todosDone.length).toEqual(data.todosDone.length);
    });
  });

  describe("UPDATE_TODO_STATUS", () => {
    it("should update status todos", () => {
      const nextState = reducer(initialState, updateTodoStatus(todo, TodoStatus.DO, TodoStatus.URGENT));
      let data = { ...dataTodo, todosUrgent: [...dataTodo.todosUrgent, todo] }
      expect(nextState.todosUrgent.length).toEqual(data.todosUrgent.length);
    });
  });

  describe("UPDATE_TODO_STATUS", () => {
    it("should update status todos", () => {
      const nextState = reducer(initialState, updateTodoStatus(todo, TodoStatus.DO, TodoStatus.REMOVED));
      let data = { ...dataTodo, todosRemoved: [...dataTodo.todosRemoved, todo] }
      expect(nextState.todosRemoved.length).toEqual(data.todosRemoved.length);
    });
  });

  describe("UPDATE_TODO", () => {
    it("should update status todos", () => {
      const nextState = reducer(initialState, updateTodo(todo_update));
      let data = { ...dataTodo, todos: [...dataTodo.todos, todo] }
      expect(nextState.todos.length).toEqual(data.todos.length);
    });
  });
