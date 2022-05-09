import { isValidCreate } from "../../utils/validate";
import { Todo, TodoStatus } from "../../models/todo";
import shortid from "shortid";

const todo: Todo = {
  content: "fake content 1",
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: shortid(),
  user_id: "userId1",
  number_id: 1,
};

const todos = [todo];

it("should valid create todo", () => {
  expect(isValidCreate(todos, "fake content 2")).toEqual(true);
  expect(isValidCreate(todos, "fake content 1")).toEqual(false);
  expect(isValidCreate(todos, "")).toEqual(false);
});
