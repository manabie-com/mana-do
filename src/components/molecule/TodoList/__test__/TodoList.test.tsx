import { render, screen } from "@testing-library/react";
import ToDoList from "components/molecule/TodoList";
import {
  EnhanceTodoStatus,
  EnhanceTodoStatusList,
} from "components/organism/Todo/hooks";
import { TodoStatus } from "models/todo";
import React from "react";
import { emptyTodoMessage } from "../TodoList";

const showTodosExample = [
  {
    id: "todo",
    user_id: "user_id",
    content: "content",
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  },
];

test.each(EnhanceTodoStatusList)("test empty todo list", (input) => {
  let emptyMessEl;
  const { getByTestId } = render(
    <ToDoList showTodos={[]} showing={input as EnhanceTodoStatus} />
  );
  emptyMessEl = getByTestId("empty-message");
  expect(emptyMessEl).toHaveTextContent(
    emptyTodoMessage(input as EnhanceTodoStatus)
  );
});

test("test not empty todo list", () => {
  render(<ToDoList showTodos={showTodosExample} showing={"ALL"} />);
  expect(screen.getAllByRole("checkbox")).toHaveLength(1);
});
