import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import shortid from "shortid";
import { TodoStatus } from "../../models/todo";
import { TodoItem } from "../TodoItem";

test("Render todos item", async () => {
  const resp = {
    content: "test",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: "firstUser",
  };
  const comp = render(<TodoItem todo={resp} />);
  const todoTestEl = comp.getByTestId("todoTest");
  expect(todoTestEl.textContent).toBe("test");
});
