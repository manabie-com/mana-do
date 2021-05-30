import { Todo, TodoStatus } from "../models/todo";
import {
  addNewTodo,
  deleteTodo,
  updateTodo,
  updateTodoStatus,
} from "../store/reducer";

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

test("add new todo item to current todo list", () => {
  const todo: Todo = {
    id: "3",
    content: "test",
    user_id: "user1",
    created_date: "1000",
    status: TodoStatus.ACTIVE,
  };

  const newTodos = addNewTodo(todos, todo);

  expect(newTodos).toEqual([...todos, todo]);
});

test("update todo status", () => {
  // const todos = [todo1, todo2];

  const newTodos = updateTodoStatus(todos, todo1.id, TodoStatus.COMPLETED);

  expect(newTodos).toEqual([{ ...todo1, status: TodoStatus.COMPLETED }, todo2]);
});

test("update todo content", () => {
  const content = "new todo content";

  const newTodos = updateTodo(todos, { ...todo1, content });

  expect(newTodos).toEqual([{ ...todo1, content }, todo2]);
});

test("delete todo", () => {
  const newTodos = deleteTodo(todos, "1");

  expect(newTodos).toEqual([todo2]);
});
