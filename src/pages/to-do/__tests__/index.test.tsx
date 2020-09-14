import React from "react";
import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import TodoPage from "../index";
import { TodoStatus } from "../../../models/todo";
import Service from "../../../service";

jest.mock("../../../service");
afterEach(cleanup);

jest.mock("../../../service");

test("get todo list", async () => {
  Service.getTodos.mockResolvedValue([
    {
      content: "hello",
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: 1,
    },
  ]);
  render(<TodoPage />);
  await waitFor(() => expect(Service.getTodos).toHaveBeenCalledTimes(1));
});

test("do not create new todo with empty value", async () => {
  Service.createTodo.mockResolvedValue("success");
  const { container } = render(<TodoPage />);
  const input = (container as any).querySelector(".Todo__input");
  fireEvent.change(input, {
    target: { value: "" },
  });
  (fireEvent as any).keyDown(input, { key: "Enter" });
  await waitFor(() => expect(Service.createTodo).toHaveBeenCalledTimes(0));
});

test("create new todo with value", async () => {
  Service.createTodo.mockResolvedValue("success");
  const { container } = render(<TodoPage />);
  const input = (container as any).querySelector(".Todo__input");
  fireEvent.change(input, {
    target: { value: "hienho" },
  });
  (fireEvent as any).keyDown(input, { key: "Enter" });
  await waitFor(() => expect(Service.createTodo).toHaveBeenCalledTimes(1));
});
  