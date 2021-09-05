import * as UtilsFunc from ".";
import { TodoStatus } from "models/todo";
const mockData = {
  content: "content",
  created_date: new Date().toISOString(),
  status: TodoStatus.COMPLETED,
  id: "123",
  user_id: "firstUser",
  color: "red",
};

it("Check todo is completed", () => {
  const isTodoCompleted = UtilsFunc.isTodoCompleted(mockData);
  const isNotTodoCompleted = UtilsFunc.isTodoCompleted({
    ...mockData,
    status: TodoStatus.ACTIVE,
  });
  expect(isTodoCompleted).toEqual(true);
  expect(isNotTodoCompleted).toEqual(false);
});

it("Check todo is active", () => {
  const isTodoActive = UtilsFunc.isTodoActive({
    ...mockData,
    status: TodoStatus.ACTIVE,
  });
  const isNotTodoActive = UtilsFunc.isTodoActive(mockData);
  expect(isTodoActive).toEqual(true);
  expect(isNotTodoActive).toEqual(false);
});
